import { AddIcon, Button, DeleteIcon, Dialog, EditIcon, Pane, Tab, Table, Tablist, Text, TextInputField } from 'evergreen-ui';
import { useState, ChangeEvent, useEffect } from 'react';
import { FetchData } from '../../services/http';
import { PlannerRequest, PlannerResponse, MonthDetail } from '../../types/serviceRequest';
import { CSVLink } from 'react-csv';
import { useAuthState } from 'react-firebase-hooks/auth';

import './planner.less';
import { connect, RootStateOrAny } from 'react-redux';
import { spinnerAction } from '../../redux/action';
import { inputPlannerList } from '../../mocks/planner';
import { auth } from '../../services/firebase';

type props = {
    dispatch: Function
}

const defaultProfileList: PlannerRequest[] = [{loanAmount: '', interestRate: '', installment: '', label: 'Pane 1'}];
const profileLimit = 3;

function Planner({ dispatch }: props) {
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [profileList, setProfileList] = useState<PlannerRequest[]>(defaultProfileList);
    const [output, setOutput] = useState<PlannerResponse>({ months: [] as MonthDetail[] });
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedDisplay, setSelectedDisplay] = useState(0);
    const [user] = useAuthState(auth);
    

    useEffect(() => {
        if (user) {
            fetchInputList();
        } else {
            setProfiles(defaultProfileList, 0)
        }
    }, [user])

    const fetchInputList = () => {
        // TODO: fetch data from db
        setProfileList(inputPlannerList);
    }

    const setProfiles = (profiles: PlannerRequest[], tab: number): void => {
        setSelectedTab(tab);
        setProfileList(profiles);
    }

    const onAddClicked = () => {
        const arr : PlannerRequest[] = [...profileList,  { ...defaultProfileList[0], label: `New Pane`}];
        console.log(arr);
        setProfiles(arr, arr.length - 1);
        console.log(profileList);
    }

    const onConfirmDeleteProfile = (close: () => void) => {
        const arr = [...profileList];
        arr.splice(selectedTab, 1);
        setProfiles(arr, 0);
        close();
    }

    const onInputChange = (key: keyof PlannerRequest, value: string) => {
        const profiles = profileList.map((item, index) => {
            if (index === selectedTab) {
                item[key] = value;
            }
            return item;
        })
        setProfileList(profiles);
    }

    const onSubmit = async () => {
        showSpinner(true);
        try {
            const fetch = await FetchData(`/plannerCalculation?loanAmount=${profileList[selectedTab].loanAmount}&interestRate=${profileList[selectedTab].interestRate}&installment=${profileList[selectedTab].installment}`);
            setOutput({ months: fetch.months as MonthDetail[] });
        } finally {
            showSpinner(false);
        }
    }

    const onTabSelected = (index: number) => {
        setSelectedTab(index);
    }

    const showSpinner = (show: boolean) => {
        dispatch(spinnerAction(show));
    }

    return(
        <Pane className='planner-container' display='flex' flexDirection='column' alignItems='center'>
            <Pane className='input-part'>
                <Pane display='flex' justifyContent='space-between'>
                    <Tablist marginBottom='10px'>
                        {!!user && profileList.map((profile, index) => {
                            return(
                                <Tab key={index} isSelected={index === selectedTab} onSelect={() => onTabSelected(index)}>
                                    {profile.label}
                                </Tab>
                            )
                        })}
                        { !!user && profileList.length < profileLimit && <Tab><AddIcon size={12} color='info' onClick={() => onAddClicked()}></AddIcon></Tab>}
                    </Tablist>
                    { !!user &&
                        <Pane minWidth='20px' display='flex' justifyContent='flex-end' gap='8px'>
                            <EditIcon cursor='pointer' />
                            { profileList.length > 1 && <DeleteIcon color='danger' cursor='pointer' onClick={() => setIsShowDialog(true)} />}
                        </Pane>}
                    <Dialog
                        isShown={isShowDialog}
                        title='Warning'
                        intent='danger'
                        onConfirm={(close: () => void) => onConfirmDeleteProfile(close)}
                        onCloseComplete={() => setIsShowDialog(false)}>
                            <Text>คุณต้องการลบ</Text>
                            {profileList[selectedTab].label
                                ? <Text size={500} fontWeight='bold'> {profileList[selectedTab].label} </Text>
                                : <Text>ข้อมูล</Text>}
                            <Text>หรือไม่?</Text>
                    </Dialog>
                </Pane>
                <Pane className='planner-part'>
                    <TextInputField label='วงเงินกู้' type='number' step={100000} min='0' required value={profileList[selectedTab].loanAmount} onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('loanAmount', e.target.value)} />
                    {/* <TextInputField label='ระยะเวลาผ่อนชำระ(ปี)' type='number' min='1' required /> */}
                    <TextInputField label='อัตราดอกเบี้ยสามปีแรก' type='number' min='0' required value={profileList[selectedTab].interestRate} onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('interestRate', e.target.value)} />
                    <TextInputField label='ผ่อนชำระงวดละ(บาท)' type='number' min='0' step={1000} required value={profileList[selectedTab].installment} onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange('installment', e.target.value)} />
                    {/* <TextInputField label='วันที่ชำระงวดแรก' type='date' /> */}
                    {/* <TextInputField label='อัตราดอกเบี้ยสามปีหลัง' type='number' min='0' /> */}
                </Pane>
                <Pane display='flex' justifyContent='end' alignItems='center' padding='10px'>
                    <Button appearance='primary' maxHeight='40px' onClick={onSubmit} >คำนวณ</Button>
                </Pane>
            </Pane>
            <Pane className='output-part' display={output.months.length ? 'block' : 'none'}>
                <Pane marginBottom='20px' display='flex' flexDirection='row' justifyContent='space-between'>
                    <Tablist>
                        <Tab key={1} onSelect={() => setSelectedDisplay(0)} isSelected={selectedDisplay === 0}>ตาราง</Tab>
                        <Tab key={2} onSelect={() => setSelectedDisplay(1)} isSelected={selectedDisplay === 1} disabled={true}>กราฟ</Tab>
                    </Tablist>
                    <Button>
                        <CSVLink data={output.months}  className='csv-text'>Download CSV</CSVLink>
                    </Button>
                </Pane>
                <Pane display={selectedDisplay === 0 ? 'block': 'none'}>
                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell>งวดที่</Table.TextHeaderCell>
                            <Table.TextHeaderCell>ยอดหนี้ ณ วันครบกำหนด</Table.TextHeaderCell>
                            <Table.TextHeaderCell>อัตราดอกเบี้ย</Table.TextHeaderCell>
                            <Table.TextHeaderCell>ผ่อนชำระงวดละ</Table.TextHeaderCell>
                            <Table.TextHeaderCell>ส่วนที่ตัดดอกเบี้ย</Table.TextHeaderCell>
                            <Table.TextHeaderCell>ส่วนที่ตัดเงินต้น</Table.TextHeaderCell>
                            <Table.TextHeaderCell>เงินต้นคงเหลือ</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                                {output.months.map(item => {
                                    return (
                                        <Table.Row key={item.no}>
                                            <Table.TextCell>{item.no}</Table.TextCell>
                                            <Table.TextCell>{item.carryLoanAmount}</Table.TextCell>
                                            <Table.TextCell>{item.interestRate}</Table.TextCell>
                                            <Table.TextCell>{item.installment}</Table.TextCell>
                                            <Table.TextCell>{item.interestAmount}</Table.TextCell>
                                            <Table.TextCell>{item.principleDistract}</Table.TextCell>
                                            <Table.TextCell>{item.remainingLoanAmount}</Table.TextCell>
                                        </Table.Row>
                                    )
                                })}
                        </Table.Body>
                    </Table>
                </Pane>
            </Pane>
        </Pane>
    )
}

const mapStateToProps = (state: RootStateOrAny) => {
    return {
        showSpinner: state.showSpinner
    }
}

export default connect(mapStateToProps)(Planner);