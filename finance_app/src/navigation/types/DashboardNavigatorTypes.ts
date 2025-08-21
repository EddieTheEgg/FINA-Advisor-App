import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CategoryManageSummary } from '../../features/settings/types';

export type DashboardStackParamList = {
    DashboardMenu: undefined;
    TransactionList: undefined;
    Settings: undefined;
    ManageCategories: undefined;
    CreateCategory: undefined;
    EditCategory: {categoryData: CategoryManageSummary};
};

export type DashboardNavigationProps = NativeStackNavigationProp<DashboardStackParamList>;
