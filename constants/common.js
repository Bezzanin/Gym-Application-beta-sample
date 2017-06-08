import Colors from './Colors';
import Layout from './Layout';

const Common = {
    /**
     * Typography
     * ---------------------
     * Display, h1, h2, h3 in dark and light mode
     */
    tabTitle: {
        fontSize: 12,
        textAlign: 'center'
    },
    darkTitleDisplay: {
        color: Colors.darkTitleTextColor,
        marginTop: Layout.gutter.s,
        marginBottom: -(Layout.gutter.xs),
        opacity: 0.5,
        fontSize: 32,
        lineHeight: 40,
        marginLeft: Layout.gutter.l
    },
    darkTitleH1: {
        color: Colors.darkTitleTextColor,
        marginBottom: Layout.gutter.s,
        fontSize: 24,
        lineHeight: 30,
        fontWeight: 'bold'
    },
    darkTitleH2: {
        color: Colors.darkTitleTextColor,
        marginBottom: Layout.gutter.s,
        fontSize: 20,
        lineHeight: 26,
        fontWeight: 'bold'
    },
    darkTitleH3: {
        color: Colors.darkTitleTextColor,
        marginBottom: Layout.gutter.s,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold'
    },
    darkTitleH4: {
        color: Colors.darkTitleTextColor,
        marginBottom: Layout.gutter.s,
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '500',
        opacity: 0.8
    },
    darkBodyText: {
        color: Colors.darkBodyTextColor,
        marginVertical: Layout.gutter.xs,
        fontSize: 14,
        lineHeight: 19
    },
    darkNameTag: {
        color: Colors.darkBodyTextColor,
        fontSize: 14,
        marginBottom: Layout.gutter.xs,
        lineHeight: 14,
        marginRight: Layout.gutter.s
    },
    darkTagTitle: {
        opacity: 1,
        lineHeight: 14,
        fontSize: 12,
        marginBottom: Layout.gutter.xs,
        fontWeight: 'normal',
        color: '#7F7F7F',
    },
    darkTagTitleDisplay: {
        fontSize: 30,
        color: Colors.darkTitleTextColor,
        opacity: 1,
        fontWeight: 'bold',
        lineHeight: 32,
        letterSpacing: -0.25,
    },
    darkSmallCap: {
        fontSize: 16,
        fontWeight: 'bold',
        width: Layout.width.m
    },
    lightTitleH1: {
        color: Colors.lightTitleTextColor,
        marginBottom: Layout.gutter.s,
        fontSize: 24,
        lineHeight: 30,
        fontWeight: 'bold'
    },
    lightTitleH2: {
        color: Colors.lightTitleTextColor,
        marginBottom: Layout.gutter.s,
        fontSize: 20,
        lineHeight: 26,
        fontWeight: 'bold'
    },
    lightTitleH3: {
        color: Colors.lightTitleTextColor,
        marginBottom: Layout.gutter.s,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold'
    },
    lightTitleH4: {
        color: Colors.lightTitleTextColor,
        marginBottom: Layout.gutter.s,
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '500',
        opacity: 0.7,
    },
    
    lightBodyText: {
        color: Colors.lightBodyTextColor,
        marginVertical: Layout.gutter.xs,
        fontSize: 14,
        lineHeight: 19
    },
    lightTagTitle: {
        opacity: 0.8,
        lineHeight: 14,
        fontSize: 12,
        marginBottom: Layout.gutter.xs,
        fontWeight: 'normal',
        color: Colors.lightTitleTextColor,
    },
    lightTagTitleDisplay: {
        opacity: 1,
        fontSize: 32,
        color: Colors.lightTitleTextColor,
        fontWeight: 'bold',
        lineHeight: 32
    },
    lightActionTitle: {
        fontSize: 16,
        lineHeight: 18,
        color: Colors.lightTitleTextColor,
        fontWeight: '500',
    },
    brightActionTitle: {
        fontSize: 16,
        lineHeight: 18,
        color: Colors.tintColor,
        fontWeight: '500',
    },
    colored: {
        color: 'red',
        fontSize: 14
    },
    coloredView: {
        backgroundColor: '#CDCDCD'
    },
    coloredViewGreen: {
        backgroundColor: 'green'
    },
    coloredViewDark: {
        backgroundColor: '#920707'
    },
    /**
     * Layout positions
     * -----------------------
     * centered, aligned, left, right
     */
    centeredText: {
        textAlign: 'center',
        width: Layout.width.l
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    paddingLeft: {
        paddingLeft: Layout.gutter.l
    },
    paddingVertical: {
        paddingVertical: Layout.gutter.m,
    },
    paddingVerticalSmall: {
        paddingVertical: Layout.gutter.s,
    },
    marginVerticalSmall: {
        marginVertical: Layout.gutter.s
    },
    marginBottom: {
        marginBottom: Layout.gutter.s
    },
    marginRight: {
        marginRight: Layout.gutter.l
    },
    marginRightM: {
        marginRight: Layout.gutter.m
    },
    sectionBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.borderColor,
    },
    removeMarginBetweenTitles: {
        marginVertical: 0
    },
    /**
     * Containers
     */
    tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
    container: {
        flex: 1,
        paddingHorizontal: Layout.gutter.l,
        paddingVertical: Layout.gutter.sxs,
        backgroundColor: 'transparent'
    },
    containerText: {
        flex: 1,
        paddingLeft: Layout.gutter.m,
    },
    containerLeft: {
        flex: 1,
        paddingLeft: Layout.gutter.l
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    pseudoNavigation: {
        height: 60,
        paddingLeft: Layout.gutter.s,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 0.5,
        paddingTop: 10,
    },
    transparentContainer: {
        paddingHorizontal: Layout.gutter.l,
        paddingVertical: Layout.gutter.l,
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        width: Layout.width.xs,
        justifyContent: 'center',
        alignItems: 'center'
    },
    minusHorizontal: {
        paddingLeft: -(Layout.gutter.l),
        marginLeft: -(Layout.gutter.sxs),
        marginTop: -(Layout.gutter.l + Layout.gutter.xs),
        paddingTop: -(Layout.gutter.l)
    },
    brightStats:{
        width: Layout.window.width - (2 * Layout.gutter.l),
        backgroundColor: Colors.tintColor,
        borderRadius: 5,
        paddingHorizontal: Layout.gutter.m,
        paddingTop: Layout.gutter.s,
    },
    promotionCard: {
        width: Layout.window.width - (2 * Layout.gutter.l),
        height: Layout.width.m * 1.3,
        borderRadius: 5,
        paddingTop: Layout.gutter.s,
        backgroundColor: 'transparent',
        marginHorizontal: Layout.gutter.l,
        justifyContent: 'center',
        alignItems:'center'
    },

    promotionProgramContainer: {
        width: Layout.width.m * 1.25,
        borderRadius: 5,
        height: Layout.width.sxs,
        margin: Layout.gutter.sxs,
        padding: Layout.gutter.sxs,
    },
    marginFirst: {
        marginLeft: Layout.gutter.l,
    },
    containerHero: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    containerBasic: {
        flex: 1,
    },
    avatar: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
 },
    /**
     * Exercise component styles
     */
    exerciseThumbnail: {
        width: Layout.width.video,
        height: Layout.height.video,
        backgroundColor: Colors.borderColor,
        borderRadius: 3,
        marginLeft: Layout.gutter.l - 5,
    },
    logThumbnail: {
        width: Layout.width.video/1.5,
        height: Layout.height.video/1.5,
        backgroundColor: Colors.borderColor,
        borderRadius: 2,
        marginLeft: Layout.gutter.l - 5,
    },
    buttons: {
        backgroundColor: "whitesmoke"
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 3,
    },
    imageCover: {
        resizeMode: 'cover',
        flex: 1,
    },
    imageCardCover: {
        width: Layout.window.width - (2 * Layout.gutter.l),
        resizeMode: 'cover',
        flex: 1,
        borderRadius: 5,
        justifyContent: 'space-around',
        paddingVertical: Layout.gutter.m,
        marginBottom: Layout.gutter.l
    },
    /**
     * Buttons style
     */
    lightButtonRounded: {
        borderRadius: 100,
        backgroundColor: 'transparent',
        width: Layout.width.m + Layout.width.s,
        borderColor: '#fff',
        borderWidth: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    textButton: {
        color: Colors.tintColor,
        fontWeight: '500',
    },
    brightButtonRounded: {
        borderRadius: 100,
        backgroundColor: Colors.tintColor,
        width: Layout.width.m + Layout.width.s,
        borderColor: Colors.tintColor,
        borderWidth: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    greyButtonRounded: {
        borderRadius: 100,
        backgroundColor: Colors.borderColor,
        width: Layout.width.m + Layout.width.s,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    /**
     * Shadows
     */
    shadowMedium: {
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
    },
    shadowLight: {
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.2,
    },
    shadowBright: {
        shadowColor: "#CE0707",
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: {
            height: 3,
            width: 0
        },
    },
    /**
     * Functional
     */
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.2)"

    }

};

module.exports = Common;