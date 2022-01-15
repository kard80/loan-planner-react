import { Button, Pane, Tab, Table, Tablist, TextInputField } from "evergreen-ui";
import { useState } from "react";

import './planner.less';

export default function Planner() {
    const [tabIndex, setTabIndex] = useState(0);
    const handleOnSubmit = (e: any) => {
        console.log(e);
        console.log('SayHi')
    }
    return(
        <Pane className="planner-container" display='flex' flexDirection='column' alignItems='center'>
            <Pane className='input-part'>
                <Pane className="planner-part" onSubmit={(e: any) => handleOnSubmit(e)}>
                    <TextInputField label='วงเงินกู้' type='number' step={100000} min='0' required />
                    <TextInputField label='ระยะเวลาผ่อนชำระ(ปี)' type='number' min='1' required />
                    <TextInputField label='อัตราดอกเบี้ยสามปีแรก' type='number' min='0' required />
                    <TextInputField label='วันที่ชำระงวดแรก' type='date' />
                    {/* <TextInputField label='ระยะเวลาผ่อน' type='number' min='0' required /> */}
                    {/* <TextInputField label='อัตราดอกเบี้ยสามปีหลัง' type='number' min='0' /> */}
                </Pane>
                <Pane display='flex' justifyContent='end' alignItems='center' padding='10px'>
                    <Button appearance='primary' maxHeight='40px' >คำนวณ</Button>
                </Pane>
            </Pane>
            <Pane className="output-part">
                <Pane marginBottom='20px'>
                    <Tablist>
                        <Tab onClick={() => setTabIndex(0)} isSelected={tabIndex === 0}>ตาราง</Tab>
                        <Tab onClick={() => setTabIndex(1)} isSelected={tabIndex === 1}>กราฟ</Tab>
                    </Tablist>
                </Pane>
                <Pane display={tabIndex === 0 ? 'block': 'none'}>
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>งวดที่</Table.TextHeaderCell>
                        <Table.TextHeaderCell>ยอดหนี้ ณ วันครบกำหนด</Table.TextHeaderCell>
                        <Table.TextHeaderCell>อัตราดอกเบี้ย</Table.TextHeaderCell>
                        <Table.TextHeaderCell>ส่วนที่ตัดดอกเบี้ย</Table.TextHeaderCell>
                        <Table.TextHeaderCell>อัตราผ่อนชำระ</Table.TextHeaderCell>
                        <Table.TextHeaderCell>ส่วนที่ตัดเงินต้น</Table.TextHeaderCell>
                        <Table.TextHeaderCell>เงินต้นคงเหลือ</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.TextCell>1</Table.TextCell>
                            <Table.TextCell>1500000</Table.TextCell>
                            <Table.TextCell>1.25</Table.TextCell>
                            <Table.TextCell>5000</Table.TextCell>
                            <Table.TextCell>20000</Table.TextCell>
                            <Table.TextCell>15000</Table.TextCell>
                            <Table.TextCell>1485000</Table.TextCell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                </Pane>
            </Pane>
        </Pane>
    )
}