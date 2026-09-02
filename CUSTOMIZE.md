# How to Customize Your Printing Services Website

## 🎯 Quick Setup Checklist

### 1. Update Facebook Page Links
Search for `yourpage` in `src/App.tsx` and replace with your actual Facebook page username.

**Links to update:**
- `https://www.facebook.com/yourpage` (2 locations - FB Page link in nav and footer)
- `https://m.me/yourpage` (2 locations - Messenger links)

Example: If your FB page is `facebook.com/printmasterPH`, change to:
- `https://www.facebook.com/printmasterPH`
- `https://m.me/printmasterPH`

### 2. Update Contact Information
In `src/App.tsx`, update the footer section with your real contact details:
- 📱 Mobile: Change `09XX XXX XXXX` to your actual number
- 📧 Email: Change `printing.services@example.com` to your email
- 📍 Location: Update with your specific city/area

### 3. Update Pricing (Optional)
If you want to change prices, find these sections in `src/App.tsx`:
- Tarpaulin prices (around line 95-100)
- T-Shirt prices (around line 110-115)
- Sticker prices (around line 125-130)

### 4. Add More Sample Photos
1. Add your photos to the `public/images/` folder
2. Update the samples section in `src/App.tsx` (around line 200-230)

Currently using generated samples:
- `/images/tarpaulin-sample.jpg`
- `/images/tshirt-sample.jpg`
- `/images/sticker-sample.jpg`

To add more, update the array:
```jsx
{[
  { src: '/images/tarpaulin-sample.jpg', label: 'Tarpaulin Banner' },
  { src: '/images/tshirt-sample.jpg', label: 'T-Shirt Design' },
  { src: '/images/sticker-sample.jpg', label: 'Custom Stickers' },
  { src: '/images/your-new-image.jpg', label: 'Your Label' }, // Add this
  // ... more items
].map(...)}
```

### 5. Connect to Facebook Page
After publishing your website:

1. **Add website link to About section:**
   - Go to your FB Page
   - Click "Edit Page Info"
   - Add website URL in "Website" field

2. **Add "Order Now" button:**
   - On your FB Page, click "+ Add Button"
   - Choose "Contact You"
   - Select "Send Message" or "Visit Website"
   - Enter your website URL

3. **Pin a post with your website:**
   - Create a post: "Order now at our website: [your-link]"
   - Click the three dots (...) → "Pin to Top of Page"

## 🚀 Building and Deploying

To build the website:
```bash
npm run build
```

The output will be in the `dist/` folder. Upload these files to any web hosting service.

## 💡 Tips for Getting Customers

1. **Share your website link** in FB posts instead of typing prices repeatedly
2. **When customers ask "Magkano tarpaulin?"** → Send website link
3. **Add new sample photos** regularly to showcase your work
4. **Update FAQ section** based on common questions you receive

## 📞 Need Help?

The website is fully functional with:
- ✅ Responsive design (works on mobile/desktop)
- ✅ Order form with validation
- ✅ Services section with prices
- ✅ Sample photos gallery
- ✅ FAQ section
- ✅ Facebook/Messenger integration
- ✅ Professional design

Just update the Facebook links and contact info, and you're ready to go!
