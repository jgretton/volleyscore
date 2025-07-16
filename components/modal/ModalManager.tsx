"use client";
import { useGameStore } from "@/store";
import React from "react";
import Modal from "./Modal";
import SetCompleteContent from "./content/SetCompleteContent";

const ModalManager = () => {
  const { closeModal, modal, undoSetPoint } = useGameStore();

  return (
    <Modal isModalOpen={modal.isOpen} closeModal={closeModal}>
      {modal.modalType === "SET_COMPLETE" && (
        <SetCompleteContent
          modalData={modal.modalData}
          closeModal={closeModal}
          undoSetPoint={undoSetPoint}
        />
      )}
      {/* {modal.modalType === 'MATCH_COMPLETE' && <MatchCompleteContent data={modal.modalData} />} */}
    </Modal>
  );
};

export default ModalManager;
