import { Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';

export const openDeleteModal = () => {
  return new Promise((resolve) => {
    openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
};
