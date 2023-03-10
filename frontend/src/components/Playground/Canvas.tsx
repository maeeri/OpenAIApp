type Props = {
  id?: string
  onMouseDown: () => void
  setCanvasRef: (ref: any) => void
}

const Canvas = (props: Props) => {
  const { id, onMouseDown, setCanvasRef } = props
  return (
    <canvas
      className="show"
      id={id}
      onMouseDown={onMouseDown}
      ref={setCanvasRef}
    />
  )
}

export default Canvas
