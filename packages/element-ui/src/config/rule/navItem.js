import {localeProps} from '../../utils';

const name = 'fcMenuItem';

export default {
    menu: 'layout',
    icon: 'icon-menu',
    name,
    label: '菜单项',
    drag: true,
    dragBtn: false,
    inside: true,
    mask: false,
    rule() {
        return {
            type: 'fcMenuItem',
            props: {
                index: '1'
            },
            children: ['菜单项']
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'input',
                field: 'index',
                title: '唯一标识',
                value: '1',
                props: {placeholder: '请输入唯一标识'}
            },
            {
                type: 'input',
                field: 'formCreateChild',
                title: '菜单文本',
                value: '菜单项'
            },
            {
                type: 'switch',
                field: 'disabled',
                title: '是否禁用'
            }
        ]);
    }
};
