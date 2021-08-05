import { heightPercentageToDP } from 'react-native-responsive-screen';

const ScreenSize = {
    TotalInsets: 0,
    topInsets: 0,
    bottomInsets:0,
    getHI: (percent) => {
        return  heightPercentageToDP(percent) - ScreenSize.TotalInsets
    }
};

export default ScreenSize;