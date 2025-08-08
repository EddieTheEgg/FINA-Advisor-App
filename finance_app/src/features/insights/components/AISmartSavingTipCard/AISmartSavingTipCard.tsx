import { View, Text } from 'react-native';
import { useState } from 'react';
import { useGetAIInsights } from '../../hooks/useGetAIInsights';
import { AILoadingCard } from '../AILoadingCard/AILoadingCard';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import { styles } from './AISmartSavingTipCard.styles';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import { TipDifficulty } from '../../types';

export const AISmartSavingTipCard = () => {
    const { data: aiInsightsData, isPending: isAIPending, error: aiError} = useGetAIInsights();
    const [isExpanded, setIsExpanded] = useState(false);

    if (isAIPending || !aiInsightsData) {
        return <AILoadingCard />;
    }

    if (aiError) {
        return <ErrorScreen
            errorText = "An error occured!"
            errorSubText = "There was a problem fetching AI insights, please try again later"
            errorMessage = {aiError.message}
        />;
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const getDifficultyColorStyle = () => {
        if (aiInsightsData.difficulty === TipDifficulty.EASY) {
            return styles.easyColorTheme;
        } else if (aiInsightsData.difficulty === TipDifficulty.MEDIUM) {
            return styles.mediumColorTheme;
        } else if (aiInsightsData.difficulty === TipDifficulty.HARD) {
            return styles.hardColorTheme;
        } else {
            return styles.unknownColorTheme;
        }
    };

    return (
        <View style = {styles.container}>
            <View style = {styles.mainContentContainer}>
                <View style = {styles.headerSection}>
                    <Text style = {styles.icon}>✨</Text>
                    <View style = {styles.textContainer}>
                        <Text style = {styles.insightsTitle}>{aiInsightsData.title}</Text>
                        <Text style = {styles.insightsSubTitle}>Smart Saving Tip</Text>
                    </View>
                </View>
                <View style = {styles.descriptionContainer}>
                    <Text
                        style = {styles.aiAnalysisDescription}
                        numberOfLines={isExpanded ? undefined : 2}
                    >
                        {aiInsightsData.description}
                    </Text>
                    {aiInsightsData.description.length > 100 && (
                        <AnimatedPressable onPress={toggleExpanded} style={styles.seeMoreButton}>
                            <Text style={styles.seeMoreText}>
                                {isExpanded ? 'See less' : 'See more...'}
                            </Text>
                        </AnimatedPressable>
                    )}
                </View>
                <View style = {styles.aiFooterContainer}>
                    <View style = {styles.rowSection}>
                        <Text style = {styles.aiLabelText}>Category Focus:</Text>
                        <Text style = {styles.statText}>{aiInsightsData.category}</Text>
                    </View>
                    <View style = {styles.rowSection}>
                        <Text style = {styles.aiLabelText}>Difficulty:</Text>
                        <Text style = {[getDifficultyColorStyle(), styles.difficultyTextBox]}>{aiInsightsData.difficulty}</Text>
                    </View>
                    <View style = {styles.rowSection}>
                        <Text style = {styles.aiLabelText}>AI Confidence:</Text>
                        <Text style = {styles.statText}>{aiInsightsData.confidence * 100}%</Text>
                    </View>
                    <View style = {styles.confidenceBarContainer}>
                        <View style = {[styles.confidenceBar, {width: `${aiInsightsData.confidence * 100}%`}]} />
                    </View>
                </View>
            </View>
        </View>
    );
};
