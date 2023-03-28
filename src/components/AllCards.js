import React, { useEffect, useState } from 'react';
import { Tabs, Button } from 'antd';
import '../antd.css';
import Card from './Card';

const { TabPane } = Tabs;

export default function AllCards() {
    const [sectionsList, setSectionsList] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/sections');
            const data = await response.json();
            const sections = data.map((section) => ({
                id: section.id,
                name: section.cardName,
                videolink: section.videoLink,
                category: section.category,
            }));
            setSectionsList(sections);
        };
        fetchData();
    }, []);

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const handleDeleteSection = async (sectionId) => {
        try {
            // Delete the section from the server
            await fetch(`http://localhost:5000/sections/${sectionId}`, { method: 'DELETE' });

            // Remove the section from the state
            setSectionsList((prevSections) => prevSections.filter((section) => section.id !== sectionId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSwitchSectionCategory = (sectionName, newCategory) => {
        setSectionsList((prevSections) =>
            prevSections.map((section) => {
                if (section.name === sectionName) {
                    return { ...section, category: newCategory };
                }
                return section;
            })
        );
    };

    const uniqueCategories = [...new Set(sectionsList.map((section) => section.category))];

    return (
        <div className="container">
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane key="all" tab="All">
                    <div className="cards-container">
                        {sectionsList.map((section) => (
                            <Card
                                id={section.id}
                                name={section.name}
                                videolink={section.videolink}
                                category={section.category}
                                onDelete={handleDeleteSection}
                                onSwitchCategory={handleSwitchSectionCategory}
                            />
                        ))}
                    </div>
                </TabPane>
                {uniqueCategories.map((category) => (
                    <TabPane key={category} tab={category}>
                        <div className="cards-container">
                            {sectionsList
                                .filter((section) => section.category === category)
                                .map((section) => (
                                    <Card
                                        id={section.id}
                                        name={section.name}
                                        videolink={section.videolink}
                                        category={section.category}
                                        onDelete={handleDeleteSection}
                                        onSwitchCategory={handleSwitchSectionCategory}
                                    />
                                ))}
                        </div>
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}