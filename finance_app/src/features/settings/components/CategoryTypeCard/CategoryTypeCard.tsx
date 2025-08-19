import { View, Text, Modal, Image } from 'react-native';
import { styles } from './CategoryTypeCard.styles';
import { colors } from '../../../../styles/colors';
import { AnimatedPressable } from '../../../../components/AnimatedPressable/AnimatedPressable';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { fontSize } from '../../../../styles/fontSizes';
import { useState } from 'react';

type CategoryTypeCardProps = {
    categoryType: 'INCOME' | 'EXPENSE' | 'TRANSFER';
}

export const CategoryTypeCard = ({categoryType} : CategoryTypeCardProps) => {
    const [isMoreDetailsExpanded, setIsMoreDetailsExpanded] = useState(false);
    if (categoryType === 'INCOME') {
        return (
            <View style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}>Category Type</Text>
                <AnimatedPressable
                    onPress = {() => setIsMoreDetailsExpanded(true)}
                    >
                    <FontAwesome6 name = "circle-question" size = {fontSize.base + 2} color = {colors.black} />
                </AnimatedPressable>
            </View>
            <View style = {styles.contentContainer}>
                <Text style = {[styles.icon, {backgroundColor: colors.lighterGreen}]}>💰</Text>
                <View style = {styles.textContainer}>
                    <Text style = {styles.categoryTypeLabel}>Income</Text>
                    <Text style = {styles.description}>Cannot be changed after creation</Text>
                </View>
                <Text style = {styles.lockIcon}>🔒</Text>
            </View>
            <Modal
                visible = {isMoreDetailsExpanded}
                transparent = {true}
                animationType = "fade"
                onRequestClose = {() => setIsMoreDetailsExpanded(false)}
            >
                <View style = {styles.modalContainer}>
                    <View style = {styles.modalContent}>
                        <Image source={require('../../../../assets/images/question_icon.png')} style={styles.modalImage} />
                        <Text style = {styles.modalTitle}>Why is this locked?</Text>
                        <Text style = {styles.modalText}>Category type is locked to prevent existing transactions and budgets from breaking.</Text>
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
    }

    if (categoryType === 'EXPENSE') {
        return (
            <View style = {styles.container}>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.title}>Category Type</Text>
                    <AnimatedPressable
                        onPress = {() => setIsMoreDetailsExpanded(true)}
                        >
                        <FontAwesome6 name = "circle-question" size = {fontSize.base + 2} color = {colors.black} />
                    </AnimatedPressable>
                </View>
                <View style = {styles.contentContainer}>
                    <Text style = {[styles.icon, {backgroundColor: colors.lighterRed}]}>💳</Text>
                    <View style = {styles.textContainer}>
                        <Text style = {styles.categoryTypeLabel}>Expense</Text>
                        <Text style = {styles.description}>Cannot be changed after creation</Text>
                    </View>
                    <Text style = {styles.lockIcon}>🔒</Text>
                </View>
                <Modal
                    visible = {isMoreDetailsExpanded}
                    transparent = {true}
                    animationType = "fade"
                    onRequestClose = {() => setIsMoreDetailsExpanded(false)}
                >
                    <View style = {styles.modalContainer}>
                        <View style = {styles.modalContent}>
                            <Image source={require('../../../../assets/images/question_icon.png')} style={styles.modalImage} />
                            <Text style = {styles.modalTitle}>Why is this locked?</Text>
                            <Text style = {styles.modalText}>Category type is locked to prevent existing transactions and budgets from breaking.</Text>
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
    }

    if (categoryType === 'TRANSFER') {
        return (
            <View style = {styles.container}>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.title}>Category Type</Text>
                    <AnimatedPressable
                        onPress = {() => setIsMoreDetailsExpanded(true)}
                        >
                        <FontAwesome6 name = "circle-question" size = {fontSize.base + 2} color = {colors.black} />
                    </AnimatedPressable>
                </View>
                <View style = {styles.contentContainer}>
                    <Text style = {[styles.icon, {backgroundColor: colors.lightBlue}]}>↔️</Text>
                    <View style = {styles.textContainer}>
                        <Text style = {styles.categoryTypeLabel}>Transfer</Text>
                        <Text style = {styles.description}>Cannot be changed after creation</Text>
                    </View>
                    <Text style = {styles.lockIcon}>🔒</Text>
                </View>
                <Modal
                    visible = {isMoreDetailsExpanded}
                    transparent = {true}
                    animationType = "fade"
                    onRequestClose = {() => setIsMoreDetailsExpanded(false)}
                >
                    <View style = {styles.modalContainer}>
                        <View style = {styles.modalContent}>
                            <Image source={require('../../../../assets/images/question_icon.png')} style={styles.modalImage} />
                            <Text style = {styles.modalTitle}>Why is this locked?</Text>
                            <Text style = {styles.modalText}>Category type is locked to prevent existing transactions and budgets from breaking.</Text>
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
    }
};

