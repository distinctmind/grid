document.querySelector('#download_btn').addEventListener('click', downloadGrid);
function downloadGrid() {
  
  createSVG();
  
  const svgNode = document.querySelector('svg');
  if (!svgNode) return
  
  const svgString = (new XMLSerializer()).serializeToString(svgNode);
  const svgBlob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8'
  });

  const DOMURL = window.URL || window.webkitURL || window;
  const url = DOMURL.createObjectURL(svgBlob);
  const image = new Image();
  
  const width = get('width');
  const height = get('height');

  svgNode.width.baseVal.value = width;
  svgNode.height.baseVal.value = height;

  image.width = width;
  image.height = height;
  image.src = url;

  image.onload = function () {
    
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.filter = 'invert(1)';
    if (ctx) ctx.drawImage(image, 0, 0);
    DOMURL.revokeObjectURL(url);

    const imgURI = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    triggerDownload(imgURI);
  };
}

function get(dimension_type){
  var dimension_value = document.querySelector(`#${dimension_type}`).value;
  if (dimension_value === '' && dimension_type === 'width') {
    dimension_value = 1920;
  } else if (dimension_value == '' && dimension_type === 'height') {
    dimension_value = 1080;
  }
  return Math.abs(dimension_value);
}

function createSVG(){
  const svgContainer = document.querySelector('#svgContainer');
  svgContainer.innerHTML += 
  `<svg id="download" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${get('width')} ${get('height')}">
    <pattern id="pattern" width="100" height="100" patternUnits="userSpaceOnUse">
      <path id="Path_3" data-name="Path 3" d="M96,95h4v1H96v4H95V96H86v4H85V96H76v4H75V96H66v4H65V96H56v4H55V96H46v4H45V96H36v4H35V96H26v4H25V96H16v4H15V96H0V95H15V86H0V85H15V76H0V75H15V66H0V65H15V56H0V55H15V46H0V45H15V36H0V35H15V26H0V25H15V16H0V15H15V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96Zm-1,0V86H86v9ZM85,95V86H76v9ZM75,95V86H66v9ZM65,95V86H56v9ZM55,95V86H46v9ZM45,95V86H36v9ZM35,95V86H26v9ZM25,95V86H16v9ZM16,85h9V76H16Zm10,0h9V76H26Zm10,0h9V76H36Zm10,0h9V76H46Zm10,0h9V76H56Zm10,0h9V76H66Zm10,0h9V76H76Zm10,0h9V76H86Zm9-10V66H86v9ZM85,75V66H76v9ZM75,75V66H66v9ZM65,75V66H56v9ZM55,75V66H46v9ZM45,75V66H36v9ZM35,75V66H26v9ZM25,75V66H16v9ZM16,65h9V56H16Zm10,0h9V56H26Zm10,0h9V56H36Zm10,0h9V56H46Zm10,0h9V56H56Zm10,0h9V56H66Zm10,0h9V56H76Zm10,0h9V56H86Zm9-10V46H86v9ZM85,55V46H76v9ZM75,55V46H66v9ZM65,55V46H56v9ZM55,55V46H46v9ZM45,55V46H36v9ZM35,55V46H26v9ZM25,55V46H16v9ZM16,45h9V36H16Zm10,0h9V36H26Zm10,0h9V36H36Zm10,0h9V36H46Zm10,0h9V36H56Zm10,0h9V36H66Zm10,0h9V36H76Zm10,0h9V36H86Zm9-10V26H86v9ZM85,35V26H76v9ZM75,35V26H66v9ZM65,35V26H56v9ZM55,35V26H46v9ZM45,35V26H36v9ZM35,35V26H26v9ZM25,35V26H16v9ZM16,25h9V16H16Zm10,0h9V16H26Zm10,0h9V16H36Zm10,0h9V16H46Zm10,0h9V16H56Zm10,0h9V16H66Zm10,0h9V16H76Zm10,0h9V16H86Z" fill="rgba(255,255,255,0.1)" fill-rule="evenodd" opacity="0.5"/>
      <path id="Path_4" data-name="Path 4" d="M6,5V0H5V5H0V6H5v94H6V6h94V5Z" fill="rgba(255,255,255,0.1)" fill-rule="evenodd"/>
    </pattern>
    <rect fill="url(#pattern)" width="100%" height="100%"></rect>
  </svg>`
}

function triggerDownload(uri){
  const a = document.createElement('a');
  a.download = 'grid.png'; // filename
  a.target = '_blank';
  a.href = uri;

  // trigger download button
  // (set `bubbles` to false here.
  // or just `a.click()` if you don't care about bubbling)
  a.dispatchEvent(new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  }));
}
