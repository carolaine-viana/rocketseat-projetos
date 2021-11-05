import 'styled-components';
import theme from './theme';

declare module 'styled-components'{
    type ThemeType = typeof theme

    //pegando a interface e acrescentando o themetype
    export interface DefaultTheme extends ThemeType{}
}

//um arquivo para sobrescrever tipos
