import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EditorCardProps {
    editor: any;
}

const EditorCard: React.FC<EditorCardProps> = ({ editor }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle>{editor.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{editor.description}</p>
            </CardContent>
        </Card>
    );
};

export default EditorCard;