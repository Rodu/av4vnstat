/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 08/07/12
 * Time: 16:18
 * To change this template use File | Settings | File Templates.
 */
// here will save instances that need to be shared among multiple objects
RODU.av4vnstat.CONFIG = {
    // Set this to true to see error messages in the browser web console
    DEBUG: false,

    VISIBILITY: {
        SHOW: 'block',
        HIDE: 'none'
    },

    // Mapping of document elements ids to (pseudo) constants
    ELEMENT_ID: {
        CONTAINERS: {
            HOME: "home",
            BASIC_DATA_CHARTS: "basicDataCharts",
            ADVANCED_MONITORING_CHARTS: "advancedMonitoringCharts"
        },

        TEXT_CONTAINERS: {
            UPDATE_TIME: "updateTime"
        },

        CHARTS_DESCRIPTIONS: {
            BASIC_CHARTS_DESCRIPTION: "basicChartDescription",
            ADVANCED_CHARTS_DESCRIPTION: "advancedChartDescription"
        },

        CHARTS: {
            HOURLY_DATA_CHART: "hourlyDataChart",
            DAILY_DATA_CHART: "dailyDataChart",
            MONTHLY_DATA_CHART: "monthlyDataChart",
            TOP_TEN_DATA_CHART: "topTenDataChart"
        }
    }
};
