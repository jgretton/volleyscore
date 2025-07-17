"use client";
import { useGameStore } from "@/store";
import React from "react";
import Modal from "./Modal";
import SetCompleteContent from "./content/SetCompleteContent";
import MatchCompleteContent from "./content/MatchCompleteContent";

const ModalManager = () => {
  const { closeModal, modal, undoSetPoint, undoAction, resetMatchData } =
    useGameStore();

  return (
    <Modal isModalOpen={modal.isOpen} closeModal={closeModal}>
      {modal.modalType === "SET_COMPLETE" && (
        <SetCompleteContent
          modalData={modal.modalData}
          closeModal={closeModal}
          undoSetPoint={undoSetPoint}
        />
      )}
      {modal.modalType === "MATCH_COMPLETE" && (
        <MatchCompleteContent
          modalData={modal.modalData}
          closeModal={closeModal}
          undoAction={undoAction}
          resetMatchData={resetMatchData}
        />
      )}
    </Modal>
  );
};

export default ModalManager;
