import { Button } from '@nextui-org/button'

export default function DesignSystem() {
  return (
    <div className="container mx-auto">
      <h1>Заголовок H1</h1>
      <h2>Заголовок H2 </h2>
      <h3>Заголовок H3</h3>
      <h4>Заголовок H4</h4>
      <p>Основной текст</p>

      <Button className="bg-black text-white text-xl uppercase" radius="sm">
        Click me!!!
      </Button>
    </div>
  )
}
