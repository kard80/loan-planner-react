import { Button, Pane, Tab, Table, Tablist, TextInputField } from "evergreen-ui";
import { useState, ChangeEvent } from "react";
import { FetchData } from "../../services/http";
import { PlannerRequest, PlannerResponse, MonthDetail } from "../../types/serviceRequest";
import { CSVLink } from "react-csv";

import './planner.less';

export default function Planner() {
    const [input, setInput] = useState<PlannerRequest>({loanAmount: '', interestRate: '', installment: ''});
    const [output, setOutput] = useState<PlannerResponse>({ months: [] as MonthDetail[] });
    const [tabIndex, setTabIndex] = useState(0);

    const handleOnSubmit = async () => {
        const fetch = await FetchData(`/plannerCalculation?loanAmount=${input.loanAmount}&interestRate=${input.interestRate}&installment=${input.installment}`);
        setOutput({ months: fetch.months as MonthDetail[] });
    }
    return(
        <Pane className="planner-container" display='flex' flexDirection='column' alignItems='center'>
            <Pane className='input-part'>
                <Pane className="planner-part">
                    <TextInputField label='วงเงินกู้' type='number' step={100000} min='0' required value={input.loanAmount} onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({...input, loanAmount: e.target.value})} />
                    {/* <TextInputField label='ระยะเวลาผ่อนชำระ(ปี)' type='number' min='1' required /> */}
                    <TextInputField label='อัตราดอกเบี้ยสามปีแรก' type='number' min='0' required value={input.interestRate} onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({...input, interestRate: e.target.value})} />
                    <TextInputField label='ผ่อนชำระงวดละ(บาท)' type='number' min='0' step={1000} required value={input.installment} onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({...input, installment: e.target.value})} />
                    {/* <TextInputField label='วันที่ชำระงวดแรก' type='date' /> */}
                    {/* <TextInputField label='อัตราดอกเบี้ยสามปีหลัง' type='number' min='0' /> */}
                </Pane>
                <Pane display='flex' justifyContent='end' alignItems='center' padding='10px'>
                    <Button appearance='primary' maxHeight='40px' onClick={handleOnSubmit} >คำนวณ</Button>
                </Pane>
            </Pane>
            <Pane className="output-part" display={output.months.length ? 'block' : 'none'}>
                <Pane marginBottom='20px' display='flex' flexDirection='row' justifyContent='space-between'>
                    <Tablist>
                        <Tab onSelect={() => setTabIndex(0)} isSelected={tabIndex === 0}>ตาราง</Tab>
                        <Tab onSelect={() => setTabIndex(1)} isSelected={tabIndex === 1}>กราฟ</Tab>
                    </Tablist>
                    <Button>
                        <CSVLink data={output.months}  className='csv-text'>Download CSV</CSVLink>
                    </Button>
                </Pane>
                <Pane display={tabIndex === 0 ? 'block': 'none'}>
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