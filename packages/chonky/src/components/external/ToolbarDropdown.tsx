/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Menu from '@material-ui/core/Menu';
import React, { useCallback, useMemo } from 'react';

import { FileActionGroup } from '../../file-actons/presentation.types';
import { important, makeChonkyStyles } from '../../util/styles';
import { ToolbarButton } from './ToolbarButton';
import { SmartToolbarDropdownButton } from './ToolbarDropdownButton';

export type ToolbarDropdownProps = FileActionGroup;

export const ToolbarDropdown: React.FC<ToolbarDropdownProps> = (props) => {
    const { name, fileActionIds } = props;
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget),
        [setAnchor]
    );
    const handleClose = useCallback(() => setAnchor(null), [setAnchor]);

    const menuItemComponents = useMemo(
        () =>
            fileActionIds.map((id) => (
                <SmartToolbarDropdownButton
                    key={`menu-item-${id}`}
                    fileActionId={id}
                    onClickFollowUp={handleClose}
                />
            )),
        [fileActionIds, handleClose]
    );

    const classes = useStyles();
    return (
        <>
            <ToolbarButton text={name} onClick={handleClick} dropdown={true} />
            <Menu
                autoFocus
                keepMounted
                elevation={2}
                anchorEl={anchor}
                onClose={handleClose}
                open={Boolean(anchor)}
                transitionDuration={150}
                classes={{ list: classes.dropdownList }}
            >
                {menuItemComponents}
            </Menu>
        </>
    );
};

const useStyles = makeChonkyStyles((theme) => ({
    dropdownList: {
        paddingBottom: important(0),
        paddingTop: important(0),
    },
}));
