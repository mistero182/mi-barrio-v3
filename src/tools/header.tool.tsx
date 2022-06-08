import whiteLogo from '../assets/icons/logo-white.svg';
import menuIcon from '../assets/icons/menu-w.png';
function styleHeaderHome() {
    return {
        navbar: {
            item_color: '#ffffff',
        },
        logoStyles: {
            position: 'relative;',
            'z-index': '9;',
        },
        logo: whiteLogo,
        menuIcon,
        menuStyles: {
            'z-index': '9;',
            visibility: 'visible'
        }
    };
}

export function getHeaderStyles(path: string) {
    switch (path) {
        case '/':
            return styleHeaderHome();
        default:
            return {
                navbar: {},
                logo: undefined,
                logoStyles: {
                    visibility: 'visible'
                }
            }
    }
}
