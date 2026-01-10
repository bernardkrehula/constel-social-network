import toast from 'react-hot-toast/headless';
import { baseUrl } from '../utils/baseUrl';

export default async function createComment(id: string, text: string) {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) return;

  try {
    const response = await fetch(`${baseUrl}/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    if (response.status === 400) {
      const { error } = await response.json();

      return toast.error(error.message);
    }
    const { comment } = await response.json();
    toast.success('Comment successfully created.');

    return comment;
  } catch (error) {
    console.error(error);
    throw new Error('Could not create the comment.');
  }
}
