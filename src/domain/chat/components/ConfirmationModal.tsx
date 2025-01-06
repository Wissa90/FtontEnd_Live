import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue
} from "@chakra-ui/react";

type ConfirmationModalProps = {
    isOpen: boolean;
    confirmationVariant: 'default' | 'destructive';

    message: string;

    confirmationText: string;
    cancelText: string;

    confirm: () => void;
    onClose: () => void;
}

export const ConfirmationModal = ({ isOpen, message, confirmationVariant, confirmationText, cancelText, confirm, onClose }: ConfirmationModalProps) => {
    const textColor = useColorModeValue("navy.700", "white");

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bg="none" boxShadow="none">
                <Card >
                    <ModalHeader
                        fontSize="22px"
                        fontWeight={"700"}
                        mx="auto"
                        color={textColor}
                        textAlign="start"
                        marginStart="unset"
                    >
                        Confirm
                    </ModalHeader>
                    <CardBody>
                        <ModalBody p="0px" >
                            <Text align="start">{message}</Text>
                        </ModalBody>
                    </CardBody>
                    <CardFooter justifyContent="flex-end">
                        <Button variant="solid" onClick={onClose}>{cancelText}</Button>
                        <Button
                            color={confirmationVariant === 'default' ? '' : "red.900"}
                            variant="solid"
                            onClick={confirm}
                        >
                            {confirmationText}
                        </Button>
                    </CardFooter>
                </Card>
            </ModalContent>
        </Modal>
    )
}