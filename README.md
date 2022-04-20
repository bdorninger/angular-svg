# Styleable SVGS and cacheable / referencable Images

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-rbyhxs)

## Referencing svg images/parts with `<use/>`

- On use, a svg is attached to the document's end (in a hidden div --&gt; element based cache). the actual location of usage creates creates an empty svg tag and references the cached one with `<use>`
- Subsequent occurrences of the same image reference to the cached one with `<use>`, too
- This "element based cache" must be maintained, ie the references to a cached image must be tracked. The cached image has to be removed from the document, when no more views have a referenciog svg
- Reference tracking can be done by the svg component wrapper (`ssvg.component` in this example). Reference count up/down shall be done in ngOnInit/ngOnDestroy

### ++:

- Can save Memory if using a a high number of identical svgs in one or more views at the same time.
- especially, if SVGs are complex
- still allows individual styling of the referencing svgs
- the proposed `ssvg.component` wrapper logic can also provide binary images (jpg, png)
- styling bin images can be done with css-filters
- won't interfere with the existing LIFO cache - albeit SVGs should not be converted to data Urls anymore

### --:

- Needs separate treatment for svgs
- Needs explicit reference tracking

## Caching images with objectUrls:

Images are loaded and raw data is packed into a Blob

In our context, when is it safe to revoke the OU?

- no view is referencing it anymore?
- using our resource cache: when it is moved out of the

**NOT RECOMMENDED: Blobs/objectUrls have been introduced for a different use case**

### ++:

- in theory, we would not need our own cache (object blobs stored with document), BUT
  we need to keep track of the objects to know when to revoke a object url / blob

### --:

- the createObjectUrl/revokeObjectUrl API was made for a different use case

- creating the blob needs the correct mime type

- Object urls must be revoked if no more necessary --> when is it safe to revoke the url?

- OU are automatically revoked if HTML document is destroyed (for Angular App: when the app is closed / we are navigating away from the app)

- svgs wrapped in blobs cannot be styled anymore

- object urls need to be sanitized (as other programmatic content applied to ng templates)

- poor diagnostics: there is just a difficult to read hash value identifying the image - difficult to find out which image this is actually!
