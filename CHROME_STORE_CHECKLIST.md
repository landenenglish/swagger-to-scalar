# Chrome Web Store Submission Checklist

## ✅ Required Files

- [x] `manifest.json` - Updated with v1.0.0, proper permissions, description
- [x] `content.js` - Production-ready code
- [x] Icons (16x16, 48x48, 128x128) - Placeholder created, use `generate-icons.html` to create proper ones
- [x] `README.md` - Complete documentation
- [x] `LICENSE` - MIT License
- [x] `PRIVACY.md` - Privacy policy
- [x] `.gitignore` - Ignore build artifacts

## 🎨 Assets Needed (Before Submission)

### Icons (Required)
- [ ] 16x16 icon - Use `extension/icons/generate-icons.html` to create
- [ ] 48x48 icon - Use `extension/icons/generate-icons.html` to create
- [ ] 128x128 icon - Use `extension/icons/generate-icons.html` to create

### Promotional Images (Required)
- [ ] Small tile: 440x280 pixels
- [ ] Large tile: 920x680 pixels (optional but recommended)
- [ ] Marquee: 1400x560 pixels (optional)

### Screenshots (Required - at least 1, recommended 3-5)
- [ ] Screenshot 1: Swagger to Scalar conversion in action
- [ ] Screenshot 2: Toggle button demonstration
- [ ] Screenshot 3: Dark mode support
- [ ] Screenshot 4: Before/after comparison
- [ ] Screenshot 5: Mobile/responsive view

## 📝 Manifest Review

- [x] Name is clear and searchable
- [x] Description is under 132 characters for short description
- [x] Version is 1.0.0 (semantic versioning)
- [x] Permissions are minimal and justified
- [x] Host permissions are specific to Swagger pages
- [x] Icons paths are correct
- [x] Author and homepage_url are set (update with your info)

## 🔒 Privacy & Security

- [x] Privacy policy created and detailed
- [x] No tracking or analytics code
- [x] No external API calls (except Scalar CDN)
- [x] localStorage usage is documented
- [x] Permissions are minimal
- [x] Code is auditable and well-commented

## 📚 Documentation

- [x] README with installation instructions
- [x] Feature list clearly documented
- [x] Usage instructions provided
- [x] Development setup documented
- [x] License included (MIT)
- [x] Contributing guidelines included

## 🧪 Testing Checklist

Before submission, test:

- [ ] Extension loads without errors
- [ ] Works on multiple Swagger UI pages
- [ ] Toggle button functions correctly
- [ ] Preference persistence works
- [ ] Dark mode detection works
- [ ] No console errors
- [ ] Works on different Swagger configurations:
  - [ ] Single spec URL
  - [ ] Multiple spec URLs
  - [ ] Authenticated APIs
  - [ ] Public APIs
- [ ] Performance is acceptable
- [ ] Memory usage is reasonable

## 📦 Build & Package

1. [ ] Test in Chrome (latest version)
2. [ ] Test in Edge (latest version)
3. [ ] Remove any console.log statements (except warnings/errors)
4. [ ] Update author name in manifest.json
5. [ ] Update homepage_url in manifest.json
6. [ ] Generate proper icons using `generate-icons.html`
7. [ ] Create a .zip file of the extension folder:
   ```bash
   cd extension
   zip -r ../swagger-to-scalar-v1.0.0.zip .
   ```

## 🚀 Chrome Web Store Submission

1. [ ] Create Chrome Web Store developer account ($5 one-time fee)
2. [ ] Navigate to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. [ ] Click "New Item"
4. [ ] Upload the .zip file
5. [ ] Fill in store listing:
   - [ ] Detailed description (use STORE_DESCRIPTION.md)
   - [ ] Category: Developer Tools
   - [ ] Language: English
   - [ ] Upload screenshots
   - [ ] Upload promotional images
   - [ ] Add privacy policy link (host PRIVACY.md somewhere public)
6. [ ] Complete privacy practices questionnaire
7. [ ] Set pricing (Free)
8. [ ] Choose regions (Worldwide recommended)
9. [ ] Submit for review

## ⏰ After Submission

- Review typically takes 1-3 business days
- Monitor dashboard for approval/rejection
- If rejected, review feedback and resubmit
- Once approved, extension is live!

## 🎯 Before You Submit - Update These

1. Replace "Your Name" with your actual name in:
   - manifest.json
   - content.js
   - LICENSE

2. Replace "yourusername" with your GitHub username in:
   - manifest.json (homepage_url)
   - README.md (all GitHub links)
   - STORE_DESCRIPTION.md

3. Generate actual icons (use generate-icons.html)

4. Take screenshots of the extension in action

5. Host PRIVACY.md publicly and link to it in the store listing

## 💡 Tips for Approval

- ✅ Clear, specific permission justifications
- ✅ Detailed privacy policy
- ✅ High-quality screenshots
- ✅ Professional description
- ✅ No misleading claims
- ✅ Working demo/test page info
- ✅ Fast review response time

## 📞 Support & Resources

- [Chrome Web Store Developer Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Chrome Extension Best Practices](https://developer.chrome.com/docs/extensions/mv3/devguide/)
- [Manifest V3 Documentation](https://developer.chrome.com/docs/extensions/mv3/)

---

Good luck with your submission! 🚀

