import React from 'react';

const Home = () => {
    React.useEffect(() => {
        document.title = 'Home - web cvdev';
    })

    return (
        <div>
            Home Component
        </div>
    )
}

export default Home;