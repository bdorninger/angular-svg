## Caching images with objectUrls:

Images are loaded and raw data is packed into a Blob

In our context, when is it safe to revoke the OU?

- no view is referencing it anymore?
- using our resource cache: when it is moved out of the cache

### ++:

- in theory, we would not need our own cache (object blobs stored with document), BUT
  we need to keep track of the objects to know when to revoke a object url / blob

### --:

- creating the blob needs the correct mime type

- Object urls must be revoked if no more necessary --> when is it safe to revoke the url?

- OU are automatically revoked if HTML document is destroyed (for Angular App: when the app is closed / we are navigating away from the app)

- svgs wrapped in blobs cannot be styled anymore

- object urls need to be sanitized (as other programmatic content applied to ng templates)
