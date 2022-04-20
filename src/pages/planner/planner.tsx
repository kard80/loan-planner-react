import { AddIcon, Button, DeleteIcon, Dialog, EditIcon, Pane, Tab, Table, Tablist, Text, TextInput, TextInputField } from 'evergreen-ui';
import { useState, ChangeEvent, useEffect } from 'react';
import { FetchData, HTTPMethod } from '../../services/http';
import { PlannerResponse, MonthDetail, ServiceRequest, ParameterInput, ParameterType } from '../../types/serviceRequest';
import { CSVLink } from 'react-csv';
import { useAuthState } from 'react-firebase-hooks/auth';

import './planner.less';
import { connect, RootStateOrAny } from 'react-redux';
import { spinnerAction } from '../../redux/action';
import { auth } from '../../services/firebase';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { toasterCustom } from '../../components/toaster/toaster';
import { Alert } from '../../lang/thai';
import NumberInput from '../../components/input/input';
import { useNavigate, useParams } from 'react-router-dom';
import { getJSONFromStorage } from '../../helpers/session-storage'

type props = {
    dispatch: Function
}

type profileList = {
    parameterInput: ParameterInput[],
    label: string
}

const profileLimit = 3;

function Planner({ dispatch }: props) {
    let { id } = useParams();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [template, setTemplate] = useState<ServiceRequest>();
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [hasChanged, setHaschanged] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [profileList, setProfileList] = useState<profileList[]>([]);
    const [output, setOutput] = useState<PlannerResponse>({ months: [] as MonthDetail[] });
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedDisplay, setSelectedDisplay] = useState(0);
    
    useEffect(() => {
        const payload = getJSONFromStorage(id as string);
        if (!Object.keys(payload).length) {
            navigate('/');
            return;
        }
        const profileListKeys: {[key: string]: string} = {};
        payload.input.forEach(item => {
            profileListKeys[item.key] = '';
        });
        setProfileList([...profileList, {parameterInput: payload.input, label: ''}]);
        setTemplate(payload);
    }, [id, navigate])

    useEffect(() => {
        if (user) {
            fetchInputList(user.uid)
                .then(() => {})
                .catch(() => toasterCustom.danger(Alert.HTTP_ERROR));
        }
    }, [user]);

    const fetchInputList = async (uid: string): Promise<void> => {
        try {
            const db = getFirestore();
            const docSnap = await getDoc(doc(db, 'planner-input', uid));
            const data = docSnap.data();
            if (data) {
                setProfileList(data.data);
            }
            return new Promise(resolve => resolve());
        } catch (err) {
            return new Promise((_, reject) => reject());
        }
    }

    const setProfiles = (profiles: profileList[], tab: number): void => {
        setSelectedTab(tab);
        setProfileList(profiles);
    }

    const onAddClicked = () => {
        const arr: profileList[] = [...profileList,  { parameterInput: template!.input, label: `New Pane`}];
        setProfiles(arr, arr.length - 1);
    }

    const onClickEditIcon = () => {
        setIsEditMode(!isEditMode);
    }

    const onConfirmChangeLabel = (close: () => void) => {
        const profiles = [...profileList];
        profiles[selectedTab].label = newLabel;
        setProfileList(profiles);
        setNewLabel('');

        PostProfileList()
        close();
    }

    const onConfirmDeleteProfile = (close: () => void) => {
        const arr = [...profileList];
        arr.splice(selectedTab, 1);
        setProfiles(arr, 0);
        // TODO: Fetch http
        toasterCustom.success('Delete success');
        close();
    }

    const onSave = () => {
        PostProfileList().then(() => setHaschanged(false));
    }

    const onInputChange = (key: string, value: string) => {
        const profiles = [...profileList];
        profiles[selectedTab].parameterInput = profiles[selectedTab].parameterInput.map(item => {
            if (item.key === key) {
                item.value = value;
            };
            return item;
        })
        setProfileList(profiles);
        setHaschanged(true);
    }

    const PostProfileList = async () => {
        if (!user?.uid) {
            toasterCustom.danger(Alert.HTTP_ERROR);
            return;
        }
        try {
            const method = HTTPMethod.POST;
            const body: BodyInit = JSON.stringify({data: profileList, uid: user?.uid});
            await FetchData('/addPlannerInput', {method, body});
        } catch(err) {
            console.error(err);
        }
    }

    const onSubmit = async () => {
        showSpinner(true);
        try {
            let param = ''; 
            profileList[selectedTab].parameterInput.forEach(item => {
                if (item.value !== undefined) {
                    param += `${item.key}=${item.value}&`
                }
            });
            param = param.slice(0, -1);
            const fetch = await FetchData(`/plannerCalculation?${param}`);
            setOutput({ months: fetch.months as MonthDetail[] });
        } catch(err) {
            console.error(err);
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
                                <Tab position='relative' key={index} isSelected={index === selectedTab} onSelect={() => onTabSelected(index)}>
                                    {profile.label}
                                </Tab>
                            )
                        })}
                        { !!user && profileList.length < profileLimit && <Tab><AddIcon size={12} color='info' onClick={() => onAddClicked()}></AddIcon></Tab>}
                    </Tablist>
                    <Dialog
                        isShown={isEditMode}
                        title='Rename'
                        onConfirm={(close: () => void) => onConfirmChangeLabel(close)}
                        onCloseComplete={() => setIsEditMode(false)}>
                            <Text>คุณต้องการเปลี่ยนชื่อจาก</Text>
                            <Text size={500} fontWeight='bold'> {profileList[selectedTab]?.label} </Text>
                            <Text>เป็น</Text>
                            <TextInput display='block' marginTop='10px' width='50%' value={newLabel} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLabel(e.target.value)} />
                    </Dialog>
                    { !!user &&
                        <Pane minWidth='20px' display='flex' justifyContent='flex-end' gap='8px'>
                            <EditIcon cursor='pointer' onClick={onClickEditIcon} />
                            { profileList.length > 1 && <DeleteIcon color='danger' cursor='pointer' onClick={() => setIsShowDialog(true)} />}
                        </Pane>}
                    <Dialog
                        isShown={isShowDialog}
                        title='Warning'
                        intent='danger'
                        onConfirm={(close: () => void) => onConfirmDeleteProfile(close)}
                        onCloseComplete={() => setIsShowDialog(false)}>
                            <Text>คุณต้องการลบ</Text>
                            {profileList[selectedTab]?.label
                                ? <Text size={500} fontWeight='bold'> {profileList[selectedTab].label} </Text>
                                : <Text>ข้อมูล</Text>}
                            <Text>หรือไม่?</Text>
                    </Dialog>
                </Pane>
                <Pane className='planner-part'>
                    {profileList[selectedTab]?.parameterInput.map((item: ParameterInput) => {
                        if (item.type === ParameterType.Number) {
                            return(
                                <NumberInput key={item.key} item={item} value={String(item.value)} onInputChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(item.key, e.target.value)} />
                            )
                        }
                            {/* <TextInputField label='ระยะเวลาผ่อนชำระ(ปี)' type='number' min='1' required /> */}
                            {/* <TextInputField label='วันที่ชำระงวดแรก' type='date' /> */}
                            {/* <TextInputField label='อัตราดอกเบี้ยสามปีหลัง' type='number' min='0' /> */}
                        return (
                            <div></div>
                        )
                    })}
                </Pane>
                <Pane display='flex' justifyContent='end' alignItems='center' padding='10px'>
                    <Button appearance='primary' maxHeight='40px' onClick={onSubmit} >คำนวณ</Button>
                    <Button display={user ? 'block': 'none'} disabled={!hasChanged} marginLeft='10px' onClick={onSave}>บันทึก</Button>
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