interface TransformerListItemProps {
    transformer: TransformerDevice;
}

const TransformerListItem = ({ transformer }: TransformerListItemProps) => {
  return (
    <div className="tranfContainer">
        <div className="tranfName">{transformer.name}</div>
        <div className="tranfTxt">One transformer is needed for every 4 batteries.</div>
        <div className="tranfInfoLbl">Footprint:</div>
        <div className="tranfInfoVal">{transformer.dimensions.width} ft x {transformer.dimensions.depth} ft</div>
        <div className="tranfInfoLbl">Energy:</div>
        <div className="tranfInfoVal">{transformer.energy} MWh</div>
        <div className="tranfInfoLbl">Cost:</div>
        <div className="tranfInfoVal">${Intl.NumberFormat().format(transformer.cost)}</div>
        <div className="tranfQtyNeeded">
            Current setup {transformer.conf_needs > 0 ? 'needs '+transformer.conf_needs : "doesn't need a"} transformer{transformer.conf_needs > 1 ? 's' : ''}
        </div>
    </div>
  )
}

export default TransformerListItem