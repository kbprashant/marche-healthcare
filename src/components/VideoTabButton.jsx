import React from 'react';
import PropTypes from 'prop-types';

const VideoTabButton = ({ title, onSelect, state, dataKey }) => {
    const isActive = state === dataKey;
    const buttonClass = isActive ? 'video-tabbutton active' : 'video-tabbutton';

    return (
        <li className={buttonClass}>
            <button onClick={onSelect}>{title}</button>
        </li>
    );
};

VideoTabButton.propTypes = {
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
};

export default VideoTabButton;