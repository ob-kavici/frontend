import React from 'react';
import Editors from '../editors/editors';
import Games from '../games/games';

const HomePage: React.FC = () => {
    return (
        <div>
            <Games />
            <Editors />
        </div>
    );
};

export default HomePage;