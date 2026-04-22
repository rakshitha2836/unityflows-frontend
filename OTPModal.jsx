const OTPModal = ({ onVerify }) => (
  <div className={styles.otpContainer}>
    <h3>Verify Phone</h3>
    <div className={styles.otpInputs}>
      {[1, 2, 3, 4].map(i => <input key={i} type="text" maxLength="1" className={styles.otpBox} />)}
    </div>
    <button onClick={onVerify} className={styles.submitBtn}>Verify & Proceed</button>
  </div>
);
