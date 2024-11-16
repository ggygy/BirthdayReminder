/* eslint-disable react/react-in-jsx-scope */
import { FunctionComponent } from 'react';
import { makeStyles, Tile } from '@rneui/themed';
import { Dimensions, View } from 'react-native';

interface BlessTileProps {
    imageSrc?: string;
    title?: string;
    caption?: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        maxHeight: '100%',
        minWidth: '100%',
        paddingHorizontal: 6,
        backgroundColor: theme.colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 15,
    },
}));

const BlessTile: FunctionComponent<BlessTileProps> = ({
    imageSrc = 'https://img.zcool.cn/community/0141e05d566fbfa8012187f4f5c0ed.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100',
    title = '马馨怡，生日快乐！🎂🎈 \n 在这个特别的日子里，我想对你说：愿你的每一天都像今天一样，充满阳光和欢笑。愿你的每一个梦想，都能像蜡烛的光芒一样，照亮你的未来。🌟',
    caption = '不要忘了许个愿哦！🎉🎉🎉',
}) => {
    const styles = useStyles();
    const screenHeight = Dimensions.get('window').height;
    return (
        <View style={styles.container}>
            <Tile
                imageSrc={{
                    uri: imageSrc,
                }}
                title={title}
                titleStyle={styles.titleStyle}
                featured
                caption={caption}
                activeOpacity={1}
                height={screenHeight - 110}
            />
        </View>
    );
};

export default BlessTile;
