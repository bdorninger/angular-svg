# Styleable SVGS and cacheable / referencable Images

## Referencing svg images <use/>

- On first use, the svg is attached to the document. Either First request of an svg, the svg may be used directly (embedded where needed) OR attached to the document's end and also referenced with <use>
- Subsequent occurrences of the same image reference to the first image with <use>

## Caching images with objectUrls:

Images are loaded and raw data is packed into a Blob

In our context, when is it safe to revoke the OU?

- no view is referencing it anymore?
- using our resource cache: when it is moved out of the cache

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
