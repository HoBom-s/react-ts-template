/* eslint-disable @typescript-eslint/no-explicit-any */

import ReactModal from "react-modal";
import styled from "styled-components";

import { COLORS } from "@/utils";
import { BIG, NORMAL } from "@/styles";
import { Button } from "../Button/Button";

import type { ChildrenAlias } from "@/types";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(33, 34, 66, 0.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const Wrapper = styled.div`
  width: 480px;
  padding: 18px 24px 22px 24px;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.white};
  border-radius: 4px;
  box-shadow:
    0 6px 10px -5px rgba(33, 34, 66, 0.04),
    0 6px 30px 5px rgba(33, 34, 66, 0.08),
    0 16px 24px 2px rgba(33, 34, 66, 0.12);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 18px;
`;

const Title = styled.div`
  ${BIG};
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.black900};
`;

const ICClose = styled.div`
  width: 20px;
  height: 20px;
  padding: 4px;
  background-image: url(/icons/ic-close.svg);
`;

const Close = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 6px;
  border-radius: 4px;
`;

const Content = styled.div``;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`;

const CancelButton = styled(Button)`
  ${NORMAL};
  border-radius: 4px;
  margin-right: 8px;
`;

interface Props {
  title: string;
  content: ChildrenAlias;
  footer: {
    cancel?: { label: string };
    confirm?: { label: string; onClick: any };
  };
  close: () => void;
}

ReactModal.setAppElement("#hb-modal-root");

/**
 * @example
 *      <Modal
 *          isOpen={true}
 *          title="Hello"
 *          content={<p>Hello</p>}
 *          footer={{
 *              cancel: {
 *                  label: "Cancel",
 *              },
 *              confirm: {
 *                  label: "Confirm",
 *                  onClick: () => console.log("Click"),
 *              },
 *          }}
 *          close={() => console.log("Close")}
 *      />
 */
export const Modal = (props: ReactModal.Props & Props) => {
  const { cancel, confirm } = props.footer;

  return (
    <ReactModal
      style={customStyles}
      shouldCloseOnOverlayClick
      onRequestClose={props.close}
      {...props}
    >
      <Wrapper>
        <Header>
          <Title>{props.title}</Title>
          <Close>
            <ICClose onClick={props.close} />
          </Close>
        </Header>
        <Content></Content>
        <Footer>
          {cancel && (
            <CancelButton size="md" onClick={props.close}>
              {cancel.label}
            </CancelButton>
          )}
          {confirm && (
            <Button
              $primary
              size="md"
              // Style을 override하지 못하는 버그가 있음
              style={{ fontSize: "14px", fontWeight: "normal" }}
              onClick={confirm.onClick}
            >
              {confirm.label}
            </Button>
          )}
        </Footer>
      </Wrapper>
    </ReactModal>
  );
};
