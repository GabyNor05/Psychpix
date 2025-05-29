import ProfilePic from './singleView/images/pfp.webp';

try {
  const response = await fetch(`http://localhost:5000/api/items`);
  if (response.ok) {
    const item = await response.json();
    console.log('Item data:', item);
    data = item;
  } else {
    alert('Item not found');
  }
} catch (err) {
  console.error('Fetch failed:', err);
}

let profilePicUrl = `https://res.cloudinary.com/dgf9sqcdy/image/upload/v1748461716/DefaultProfilePic_xr1uie.jpg`;

export default function UserData() {
    const data = {
        userName: 'BillyFlowers',
        userProfilePic: profilePicUrl
    }

    return data;
}