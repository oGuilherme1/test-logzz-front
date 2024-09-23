import Swal from 'sweetalert2';

export const showAlert = (title, text, icon, callback) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed && callback) {
            callback(); // Chama a callback se fornecida
        }
    });
};

export const showSuccess = (message, callback) => {
    showAlert('Sucesso!', message, 'success', callback);
};

export const showError = (message, callback) => {
    showAlert('Erro!', message, 'error', callback);
};

export const showWarning = (message, callback) => {
    showAlert('Atenção!', message, 'warning', callback);
};

export const showInfo = (message, callback) => {
    showAlert('Informação', message, 'info', callback);
};

export const showConfirmation = (title, text, confirmCallback) => {
    Swal.fire({
        title: title || 'Are you sure?',
        text: text || 'Do you want to proceed with this action?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed && confirmCallback) {
            confirmCallback();
        }
    });
};
