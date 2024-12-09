import React from 'react';
import Editors from '../editors/editors';
import Games from '../games/game-type-list';

const HomePage: React.FC = () => {
    return (
        <div>
            <Games />
            <Editors />
        </div>
    );
};

export default HomePage;