import { TouchableOpacity } from 'react-native'
import { TouchableCardProps } from '../models/TouchableCardProps';
import Card from './Card';

const TouchableCard = (props: TouchableCardProps) => {
    return(
        <TouchableOpacity 
        onPress={() => props.pressFn(props.id, props.playerId)}
        onLongPress={() => props.longPressFn(props.id, props.playerId)}
        >
            <Card
            id={props.id}
            playerId={props.playerId}
            name={props.name}
            description={props.description}
            type={props.type}
            cost={props.cost}/>
        </TouchableOpacity>
    );
}

export default TouchableCard;