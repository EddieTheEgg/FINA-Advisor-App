import { View, Text } from 'react-native';
import { useState } from 'react';
import { useGetAIBudgetAnalysis } from '../../hooks/useGetAIBudgetAnalysis';
import { AILoadingCard } from '../AILoadingCard/AILoadingCard';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { styles} from './AIBudgetAnalysisCard.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { BudgetAnalysisPriority } from '../../types';

export const AIBudgetAnalysisCard = () => {
    const { data: aiBudgetData, isPending: isAIPending, error: aiError} = useGetAIBudgetAnalysis();
    const [isExpanded, setIsExpanded] = useState(false);

    if (isAIPending || !aiBudgetData) {
        return <AILoadingCard />;
    }

    if (aiError) {
        return <ErrorScreen
            errorText = "An error occured!"
            errorSubText = "There was a problem fetching AI budget analysis, please try again later"
            errorMessage = {aiError.message}
        />;
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const getPriorityColorStyle = () => {
        if (aiBudgetData.priority === BudgetAnalysisPriority.HIGH) {
            return styles.highPriorityTheme;
        } else if (aiBudgetData.priority === BudgetAnalysisPriority.MEDIUM) {
            return styles.mediumPriorityTheme;
        } else if (aiBudgetData.priority === BudgetAnalysisPriority.LOW) {
            return styles.lowPriorityTheme;
        } else {
            return styles.unknownPriorityTheme;
        }
    };



    return (
        <View style = {styles.container}>
            <View style = {styles.mainContentContainer}>
                <View style = {styles.headerSection}>
                    <Text style = {styles.icon}>🎯</Text>
                    <View style = {styles.textContainer}>
                        <Text style = {styles.insightsTitle}>{aiBudgetData.title}</Text>
                        <Text style = {styles.insightsSubTitle}>Budget AI Analysis</Text>
                    </View>
                </View>
                <View style = {styles.descriptionContainer}>
                    <Text
                        style = {styles.aiAnalysisDescription}
                        numberOfLines={isExpanded ? undefined : 2}
                    >
                        {aiBudgetData.analysis}
                    </Text>
                    {aiBudgetData.analysis.length > 100 && (
                        <AnimatedPressable onPress={toggleExpanded} style={styles.seeMoreButton}>
                            <Text style={styles.seeMoreText}>
                                {isExpanded ? 'See less' : 'See more...'}
                            </Text>
                        </AnimatedPressable>
                    )}
                </View>
                <View style = {styles.aiFooterContainer}>
                    <View style = {styles.rowSection}>
                        <Text style = {styles.aiLabelText}>Budget Category:</Text>
                        <Text style = {styles.statText}>{aiBudgetData.budgetCategory || 'Overall'}</Text>
                    </View>
                    <View style = {styles.rowSection}>
                        <Text style = {styles.aiLabelText}>Priority:</Text>
                        <Text style = {[getPriorityColorStyle(), styles.priorityTextBox]}>{aiBudgetData.priority}</Text>
                    </View>

                    <View style = {styles.rowSection}>
                        <Text style = {styles.aiLabelText}>AI Confidence:</Text>
                        <Text style = {styles.statText}>{Math.round(aiBudgetData.confidence * 100)}%</Text>
                    </View>
                    <View style = {styles.confidenceBarContainer}>
                        <View style = {[styles.confidenceBar, {width: `${aiBudgetData.confidence * 100}%`}]} />
                    </View>
                </View>
            </View>
        </View>
    );
};
