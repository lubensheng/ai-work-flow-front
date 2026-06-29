interface ViewProps {
  options: { key: string; label: string }[];
}

function SelectPanel(props: ViewProps) {
  const { options } = props
  return <div>
    {
      options.map(item => {
        return <div key={item.key}>{item.label}</div>
      })
    }
  </div>;
}

export default SelectPanel;
