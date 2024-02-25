import React, {FC, ReactNode} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ModalProps, default as RNModal} from 'react-native-modal';
import CloseIcon from '../assets/icons/close.png';
import Colors from '../assets/Colors';

interface CustomModalProps extends Partial<ModalProps> {
  containerStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
  props?: ModalProps;
  onClose?: () => void;
  isCloseButtonVisible?: boolean;
  isDisabledCloseButton?: boolean;
}
const Modal: FC<CustomModalProps> = ({
  containerStyle,
  children,
  onClose = () => {},
  isCloseButtonVisible = false,
  isDisabledCloseButton = false,
  ...props
}) => {
  return (
    <RNModal
      hideModalContentWhileAnimating
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      animationInTiming={700}
      useNativeDriver
      style={{margin: 0}}
      {...props}>
      <View style={[styles.wrapper, containerStyle]}>
        {isCloseButtonVisible && (
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButtonContainer}>
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        )}
        {children}
      </View>
    </RNModal>
  );
};
export default Modal;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 24,
    overflow: 'hidden',
  },
  closeButtonContainer: {
    position: 'absolute',
    zIndex: 99,
    right: 8,
    top: 8,
    backgroundColor: Colors.white,
    borderRadius: 99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 8,
  },
  closeIcon: {
    height: 16,
    width: 16,
  },
});
