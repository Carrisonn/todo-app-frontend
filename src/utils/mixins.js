import Swal from 'sweetalert2'

export const toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 6000,
  padding: '0.5rem',
  background: '#4c00ff',
  color: '#fff',
})