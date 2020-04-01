import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Modal from '~/components/Modal';

const Complaint = forwardRef(({ postId }, ref) => {
  function handleComplaint() {
    return postId;
  }

  return (
    <Modal
      ref={ref}
      title="Denunciar"
      subtitle="Se você não concorda com essa atualização, confirme sua solicitação."
      confirmText="Denunciar"
      onConfirm={handleComplaint}
    />
  );
});

Complaint.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Complaint;
