/**
 * Logo Management Utility
 * 
 * This script provides examples of how to manage logos through the API.
 * You can use these functions in your admin dashboard or run them directly.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Example: Get all logos
async function getAllLogos() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/logos`);
    const logos = await response.json();
    console.log('All logos:', logos);
    return logos;
  } catch (error) {
    console.error('Error fetching logos:', error);
  }
}

// Example: Add a new logo
async function addLogo(logoData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/logos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logoData)
    });
    
    const newLogo = await response.json();
    console.log('Logo created:', newLogo);
    return newLogo;
  } catch (error) {
    console.error('Error creating logo:', error);
  }
}

// Example: Update a logo
async function updateLogo(logoId, updateData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/logos/${logoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    
    const updatedLogo = await response.json();
    console.log('Logo updated:', updatedLogo);
    return updatedLogo;
  } catch (error) {
    console.error('Error updating logo:', error);
  }
}

// Example: Delete a logo
async function deleteLogo(logoId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/logos/${logoId}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    console.log('Logo deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting logo:', error);
  }
}

// Example: Deactivate a logo (instead of deleting)
async function deactivateLogo(logoId) {
  return updateLogo(logoId, { active: false });
}

// Example: Reactivate a logo
async function activateLogo(logoId) {
  return updateLogo(logoId, { active: true });
}

// Example: Update logo sort order
async function updateLogoOrder(logoId, newSortOrder) {
  return updateLogo(logoId, { sortOrder: newSortOrder });
}

// Example usage:
async function exampleUsage() {
  console.log('=== Logo Management Examples ===');
  
  // 1. Get all logos
  console.log('\n1. Fetching all logos...');
  await getAllLogos();
  
  // 2. Add a new logo
  console.log('\n2. Adding a new logo...');
  const newLogo = await addLogo({
    name: 'New Client',
    imageUrl: '/clients/new-client.png',
    altText: 'New Client Logo',
    link: 'https://newclient.com',
    sortOrder: 13
  });
  
  if (newLogo && newLogo.id) {
    // 3. Update the logo
    console.log('\n3. Updating the logo...');
    await updateLogo(newLogo.id, {
      name: 'Updated Client Name',
      altText: 'Updated Client Logo'
    });
    
    // 4. Deactivate the logo
    console.log('\n4. Deactivating the logo...');
    await deactivateLogo(newLogo.id);
    
    // 5. Delete the logo (optional - be careful!)
    console.log('\n5. Deleting the logo...');
    await deleteLogo(newLogo.id);
  }
  
  console.log('\n=== Examples completed ===');
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getAllLogos,
    addLogo,
    updateLogo,
    deleteLogo,
    deactivateLogo,
    activateLogo,
    updateLogoOrder
  };
}

// Run examples if called directly
if (require.main === module) {
  exampleUsage().catch(console.error);
}

console.log(`
📋 Logo Management API Endpoints:

GET    /api/logos           - Get all active logos
POST   /api/logos           - Create a new logo
GET    /api/logos/:id       - Get a specific logo
PUT    /api/logos/:id       - Update a logo
DELETE /api/logos/:id       - Delete a logo

📝 Logo Data Structure:
{
  "name": "Client Name",
  "imageUrl": "/clients/logo.png",
  "altText": "Client Logo",
  "link": "https://client.com",
  "active": true,
  "sortOrder": 1
}

💡 Tips:
- Set 'active: false' to hide logos without deleting them
- Use 'sortOrder' to control the display order
- Include 'link' to make logos clickable
- Always provide proper 'altText' for accessibility
`); 