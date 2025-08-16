import { View, Text, Modal, Image } from 'react-native';
import { styles } from './BudgetCategoryDetails.styles';
import { CoreBudgetData } from '../../../types';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../../../styles/colors';
import { fontSize } from '../../../../../styles/fontSizes';
import { AnimatedPressable } from '../../../../../components/AnimatedPressable/AnimatedPressable';
import { formatDateMonthYear } from '../../../../../utils/formatDate';
import { useState } from 'react';
import { formatCurrencyWithConditionalDecimals } from '../../../../../utils/formatAmount';


type BudgetCategoryDetailsProps = {
    data: CoreBudgetData;
}

export const BudgetCategoryDetails = ({data}: BudgetCategoryDetailsProps) => {

    const [isMoreDetailsExpanded, setIsMoreDetailsExpanded] = useState(false);


    return (
        <View style = {styles.container}>
            <View style = {styles.budgetDetailsHeaderSection}>
                <Text style = {styles.budgetDetailsTitle}>Budget Category</Text>
                <AnimatedPressable
                    onPress = {() => setIsMoreDetailsExpanded(true)}
                >
                    <FontAwesome6 name = "circle-question" size = {fontSize.base + 2} color = {colors.black} />
                </AnimatedPressable>
            </View>
            <View style = {styles.budgetDetailsContentSection}>
                <Text style = {[styles.budgetDetailsIcon, {backgroundColor: data.budgetColor}]}>{data.budgetIcon}</Text>
                <View style = {styles.budgetDetailsTitleContainer}>
                    <Text style = {styles.budgetDetailsTitle}>{data.budgetTitle}</Text>
                    <Text style = {styles.budgetDetailsPeriod}>{formatDateMonthYear(data.budgetPeriod)} • Cannot be changed</Text>
                </View>
                <FontAwesome6 name = "lock" size = {fontSize.base + 2} color = {colors.black} />
            </View>
            <Modal
                visible = {isMoreDetailsExpanded}
                transparent = {true}
                animationType = "fade"
                onRequestClose = {() => setIsMoreDetailsExpanded(false)}
            >
                <View style = {styles.modalContainer}>
                    <View style = {styles.modalContent}>
                        <Image source={require('../../../../../assets/images/question_icon.png')} style={styles.modalImage} />
                        <Text style = {styles.modalTitle}>Why is this locked?</Text>
                        <Text style = {styles.modalText}>We lock these fields so your ${formatCurrencyWithConditionalDecimals(data.spentAmount)} in spending stays connected to the right budget. Need a different category or month? Just create a new budget!</Text>
                        <AnimatedPressable
                            onPress = {() => setIsMoreDetailsExpanded(false)}
                        >
                            <Text style = {styles.modalCloseButton}>Close</Text>
                        </AnimatedPressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
