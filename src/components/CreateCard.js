import React, { useState, useEffect } from 'react';
import { Tabs, Select, Form, Input, Button, Modal } from 'antd';
import '../antd.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js'

const { TabPane } = Tabs;
const { Option } = Select;

const CreateCard = () => {
    const [form] = Form.useForm();
    const [sectionsList, setSectionsList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleModalOk = (values) => {
        const sectionName = values.sectionName.trim();
        if (!sectionName) return;

        const isDuplicate = sectionsList.some((section) => section.name === sectionName);
        if (isDuplicate) return;

        const newSection = { id: sectionsList.length + 1, name: sectionName };
        setSectionsList([...sectionsList, newSection]);
        setModalVisible(false);
        form.setFieldsValue({ category: newSection.name });
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleAddSection = () => {
        setModalVisible(true);
    };

    const handleCardSubmit = async (values) => {
        console.log('Form values:', values);
        console.log('Sections List:', sectionsList);

        const res = await fetch('http://localhost:5000/sections', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const data = await res.json()

        setSectionsList([...sectionsList, data])
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/sections');
            const data = await response.json();
            const uniqueSections = [...new Set(data.map((user) => user.category))];
            const sections = uniqueSections.map((section, index) => ({ id: index + 1, name: section }));
            setSectionsList(sections);
            console.log("---> ", data)
            console.log("-------->",sectionsList)
        };
        fetchData();
    }, []);

    const navigate = useNavigate()

    return (
        <div className="App">
        
            <Form form={form} onFinish={handleCardSubmit} style={{ marginTop: 20 }}>
                <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                    <Select style={{ width: 200 }}>
                        {sectionsList.map((section) => (
                            <Option key={section.id} value={section.name}>{section.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Name of Card" name="cardName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Link of Video" name="videoLink" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                <Button onClick={handleAddSection}>Add a new section</Button>
                <Modal
                    title="Create a new Category"
                    open={modalVisible}
                    onCancel={handleModalCancel}
                    footer={[
                        <Button key="cancel" onClick={handleModalCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" form="sectionForm" htmlType="submit">
                            Create
                        </Button>,
                    ]}
                >
                    <Form
                        id="sectionForm"
                        onFinish={handleModalOk}
                        layout="vertical"
                        initialValues={{ sectionName: '' }}
                    >
                        <Form.Item
                            label="Name of section"
                            name="sectionName"
                            rules={[{ required: true, message: 'Please input a name for the new section!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Form>
        </div>
    );
};

export default CreateCard;