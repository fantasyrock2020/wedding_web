import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OrnamentalDivider from './OrnamentalDivider';
import CTextField from './TextField';
import SubmitButton from './SubmitButton';
import { getLocalInvite, createInvite, getInvite } from '../services/inviteService';
import { useIsDesktop } from '../hooks/useResponsive';
import type { InvitePayload } from '../types';
import './RSVP.css';

export default function RSVP() {
  const isDesktop = useIsDesktop();
  const [isGoing, setIsGoing] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [wishing, setWishing] = useState('');

  const [existingInvite, setExistingInvite] = useState<any | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-check for existing RSVP when phone number changes (9 to 11 digits)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setIsChecking(true);
      setError(null);
      try {
        const invitee = await getLocalInvite();
        if (invitee) {
          setExistingInvite(invitee);
          // Pre-fill the form with existing RSVP data
          setPhone(invitee.phone || '')
          setName(invitee.name || '');
          setIsGoing(invitee.status === 'going');
          if (invitee.status === 'going') {
            setQuantity(invitee.numberOfGuests ? String(invitee.numberOfGuests) : '1');
          } else {
            setWishing(invitee.message || '');
          }
        } else {
          setExistingInvite(null);
        }
      } catch (error) {
        console.error('Error fetching invite:', error);
      } finally {
        setIsChecking(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, []);

  const handleSubmit = async () => {
    setError(null);
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError('Vui lòng nhập tên của bạn.');
      throw new Error('Name cannot be empty');
    }
    if (!trimmedPhone) {
      setError('Vui lòng nhập số điện thoại.');
      throw new Error('Phone cannot be empty');
    }

    const result = await getInvite(trimmedPhone);
    if (result) {
      setError('Số điện thoại này đã được đăng ký RSVP.');
      throw new Error('Invite already exists');
    }

    const payload: InvitePayload = {
      name: trimmedName,
      phone: trimmedPhone,
      status: isGoing ? 'going' : 'not_going',
      message: isGoing ? undefined : wishing || 'Best wishes!',
      numberOfGuests: isGoing ? Number(quantity) || 1 : undefined,
    };

    await createInvite(payload);

    setExistingInvite({
      ...payload,
      createdAt: new Date().toISOString(),
      respondedAt: null,
    });

    setShowSuccess(true);
  };

  return (
    <div className="rsvp">
      <div className="rsvp__bg" />
      <div className="rsvp__center">
        <div className="rsvp__card-wrap">
          <div className="rsvp__card">
            <OrnamentalDivider color="rgba(255,255,255,0.3)" />

            <p className="rsvp__eyebrow">RSVP</p>
            <h2 className="rsvp__title">Xác Nhận
              <br />
              Tham Dự
            </h2>
            <p className="rsvp__subtitle">
              Sự hiện diện của bạn là niềm hạnh phúc
              <br />
              của gia đình chúng tôi
            </p>

            <OrnamentalDivider color="rgba(255,255,255,0.3)" />

            <div className="rsvp__toggle-row">
              <ToggleButton
                title="SẼ THAM DỰ"
                selected={isGoing}
                onClick={() => {
                  setIsGoing(true);
                  setError(null);
                }}
              />
              <ToggleButton
                title="GỬI LỜI CHÚC"
                selected={!isGoing}
                onClick={() => {
                  setIsGoing(false);
                  setError(null);
                }}
              />
            </div>

            {isChecking && (
              <p className="rsvp__status-text rsvp__status-text--checking">
                Đang tìm thông tin thiệp...
              </p>
            )}
            {existingInvite && !isChecking && (
              <p className="rsvp__status-text rsvp__status-text--found">
                ✨ Đã tìm thấy phản hồi trước đó. Bạn có thể chỉnh sửa và gửi lại để cập nhật.
              </p>
            )}
            {error && (
              <p className="rsvp__status-text rsvp__status-text--error">
                {error}
              </p>
            )}

            <AnimatePresence mode="wait">
              {isGoing ? (
                <motion.div
                  key="going"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="rsvp__form"
                >
                  <CTextField
                    hint="Tên của bạn"
                    value={name}
                    onChange={(val) => {
                      setName(val);
                      setError(null);
                    }}
                  />
                  <CTextField
                    hint="Số điện thoại"
                    value={phone}
                    onChange={(val) => {
                      setPhone(val);
                      setError(null);
                    }}
                    type="tel"
                  />
                  <CTextField
                    hint="Số người tham dự"
                    value={quantity}
                    onChange={setQuantity}
                    type="number"
                    digitsOnly
                  />
                  <CTextField
                    hint="Lời chúc gửi đến cô dâu chú rể..."
                    value={wishing}
                    onChange={setWishing}
                    maxLines={4}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="not_going"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="rsvp__form"
                >
                  <CTextField
                    hint="Tên của bạn"
                    value={name}
                    onChange={(val) => {
                      setName(val);
                      setError(null);
                    }}
                  />
                  <CTextField
                    hint="Số điện thoại"
                    value={phone}
                    onChange={(val) => {
                      setPhone(val);
                      setError(null);
                    }}
                    type="tel"
                  />
                  <CTextField
                    hint="Lời chúc gửi đến cô dâu chú rể..."
                    value={wishing}
                    onChange={setWishing}
                    maxLines={4}
                  />

                  <p className="rsvp__gift-label">HỘP MỪNG CƯỚI</p>
                  <div className={`rsvp__qr-row ${isDesktop ? 'rsvp__qr-row--desktop' : ''}`}>
                    <QRCard title="Nhà Gái" name="Linh Nguyễn" account="123456789 — Vietcombank" />
                    <QRCard title="Nhà Trai" name="Huy Trần" account="987654321 — Techcombank" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rsvp__submit-gap" />
            <SubmitButton onPressed={handleSubmit} hasExistingData={!!existingInvite} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="rsvp__popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rsvp__popup"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.35 }}
            >
              <p className="rsvp__popup-title">
                💍 Cảm ơn bạn!
              </p>

              <p className="rsvp__popup-message">
                {isGoing
                  ? 'Chúng tôi rất mong được đón tiếp bạn tại buổi lễ.'
                  : 'Cảm ơn lời chúc ý nghĩa của bạn dành cho chúng tôi.'}
              </p>

              <button
                className="rsvp__popup-button"
                onClick={() => setShowSuccess(false)}
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToggleButton({
  title,
  selected,
  onClick,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`toggle-button ${selected ? 'toggle-button--selected' : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

function QRCard({ title, name, account }: { title: string; name: string; account: string }) {
  return (
    <div className="qr-card">
      <p className="qr-card__title">{title.toUpperCase()}</p>
      <div className="qr-card__box">
        <span className="qr-card__icon">▦</span>
      </div>
      <p className="qr-card__name">{name}</p>
      <p className="qr-card__account">{account}</p>
    </div>
  );
}
