import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { getCapture } from '@/apis/coretimes';
import { LargeModal } from '@/components/Common/Modal';
import { ImageListInfo } from '@/types/socket';
import { formatMMSSString } from '@/utils/getMituteAndSecond';
import { getNickName } from '@/utils/getNicknames';

interface GalleryModalProps {
  curRoomId: string;
  isShowing: boolean;
  handleCancel: () => void;
}

const GalleryModal = ({
  curRoomId,
  isShowing,
  handleCancel,
}: GalleryModalProps) => {
  const [galleryImages, setGalleryImages] = useState<ImageListInfo[] | null>(
    null,
  );
  const [formattedGalleryImages, setFormattedGalleryImages] = useState<
    ImageListInfo[] | null
  >(null);

  const removeDuplicateFile = (images: ImageListInfo[]): ImageListInfo[] => {
    const uniqueLinks = new Set<string>();
    return images.filter((image) => {
      if (uniqueLinks.has(image.fileLink)) {
        return false;
      }
      uniqueLinks.add(image.fileLink);
      return true;
    });
  };

  const getGalleryData = async () => {
    const images = await getCapture(curRoomId);
    const filteredImages = removeDuplicateFile(images);

    const updatedImages = await Promise.all(
      filteredImages.map(async (image) => {
        const nickname = await getNickName(image.memberId);
        return { ...image, nickname };
      }),
    );

    setGalleryImages(updatedImages);
  };

  useEffect(() => {
    if (isShowing) getGalleryData();
  }, [isShowing]);

  return (
    isShowing && (
      <LargeModal title="랜덤 캡처 화면 갤러리" isShowing={isShowing}>
        <StGrlleryWrapper>
          {galleryImages && (
            <>
              {galleryImages.map((image) => (
                <StImageWrapper key={`${image.memberId}-${image.createdTime}`}>
                  <p>{image.nickname}</p>
                  <p>{formatMMSSString(image.createdTime)}</p>
                  <img src={image.fileLink} alt="capture" />
                </StImageWrapper>
              ))}
            </>
          )}
          <button type="button" onClick={handleCancel}>
            X
          </button>
        </StGrlleryWrapper>
      </LargeModal>
    )
  );
};

export default GalleryModal;

const StGrlleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  max-height: 56rem;
  padding: 1.5rem 3.4rem 2.4rem 3.4rem;
  box-sizing: border-box;
`;

const StImageWrapper = styled.div`
  & > img {
    width: 25rem;
    height: 14rem;

    border-radius: 0.8rem;
  }
`;
