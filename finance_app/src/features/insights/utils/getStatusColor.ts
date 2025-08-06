import { colors } from '../../../styles/colors';
import { KeyInsightsStatus } from '../types';

export const getStatusColor = (status : KeyInsightsStatus) => {
    if (status === KeyInsightsStatus.POSITIVE) {
        return {
            backgroundColor: colors.green,
        };
    }
    if (status === KeyInsightsStatus.NEGATIVE) {
        return {
            backgroundColor: colors.red,
        };
    }
    if (status === KeyInsightsStatus.WARNING) {
        return {
            backgroundColor: colors.yellowBackground,
        };
    }
    return {
        backgroundColor: colors.gray[500],
    };
};
