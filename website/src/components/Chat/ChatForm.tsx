import { Box, CircularProgress, Flex, Textarea } from "@chakra-ui/react";
import { Send } from "lucide-react";
import { useTranslation } from "next-i18next";
import { forwardRef, KeyboardEvent, SyntheticEvent, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { QueueInfo } from "src/lib/chat_stream";

import { ChatConfigDrawer } from "./ChatConfigMobile";
import { ChatInputIconButton } from "./ChatInputIconButton";

type ChatFormProps = {
  isSending: boolean;
  onSubmit: () => void;
  queueInfo: QueueInfo | null;
};

// eslint-disable-next-line react/display-name
export const ChatForm = forwardRef<HTMLTextAreaElement, ChatFormProps>((props, ref) => {
  const { isSending, onSubmit: onSubmit, queueInfo } = props;
  const { t } = useTranslation("chat");
  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevents the addition of a new line
        onSubmit();
      }
    },
    [onSubmit]
  );
  return (
    <Box
      as="form"
      maxWidth={{ base: "3xl", "2xl": "4xl" }}
      onSubmit={handleSubmit}
      className="pt-2 pb-4 w-full mx-auto"
    >
      <div className="relative">
        <Textarea
          as={TextareaAutosize}
          ref={ref}
          bg="gray.200"
          borderRadius="md"
          rows={1}
          maxRows={10}
          py={{ base: 2, md: 3 }}
          onKeyDown={handleKeydown}
          placeholder={t("input_placeholder")}
          _dark={{
            bg: "whiteAlpha.100",
          }}
          border="0"
          outline="none"
          _focus={{
            outline: "none !important",
            boxShadow: "none",
          }}
          style={{ resize: "none" }}
        />
        <Flex position="absolute" zIndex="10" className="ltr:right-0 rtl:left-0 top-0 h-full items-center px-4" gap="2">
          <ChatConfigDrawer />
          {isSending ? (
            <CircularProgress isIndeterminate size="20px" />
          ) : (
            <ChatInputIconButton icon={Send} onClick={handleSubmit}></ChatInputIconButton>
          )}
        </Flex>
      </div>
    </Box>
  );
});
