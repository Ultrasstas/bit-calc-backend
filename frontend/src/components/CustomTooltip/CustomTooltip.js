import React from 'react';
import ReactTooltip from 'react-tooltip';
import Alert from '../../icons/alert.svg';

const styles = {
    wrapper: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '4px'
    },
    mark: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '14px',
        height: '14px',
        transform: 'rotate(180deg)'
    }
}

const CustomTooltip = (props) => (
    <span style={styles.wrapper}>
        <span style={styles.mark} data-for={props.tooltipId} data-tip={props.tooltipText}>
            <img style={styles.img} src={`${Alert}`} alt="Alert"/>
        </span>
        <ReactTooltip id={props.tooltipId} html={true} place="top" delayShow={100} />
    </span>
);

export default CustomTooltip;