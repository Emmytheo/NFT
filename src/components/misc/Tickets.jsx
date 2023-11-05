import { Stack, useMediaQuery } from '@mui/material';
import { TicketCard } from '../Cards/TicketCard';
import TicketsCarousel from '../carousel/ticketsCarousel';



export default function Tickets(props) {
    const { children, value, index, ...other } = props;
    const isLarge = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme => theme.breakpoints.down('md'));
    const tickets = [
      // {
      //   name: "OSCAFEST",
      //   price: "5000",
      //   state: "on sale",
      //   type: "Single",
      // },
      // {
      //   name: "DATAFEST",
      //   price: "2000",
      //   state: "on sale",
      //   type: "Single",
      // },
      // {
      //   name: "SMFEST",
      //   price: "7000",
      //   state: "on sale",
      //   type: "Single",
      // }
    ]
    return (
        <Stack 
          spacing={0}
          marginY={5}
          marginTop={0}
        >
          <div className="section-title-wrapper" style={{paddingBlock: '0px'}}>
            <h2 className="section-title">Tickets</h2>
            <button className="btn btn-link icon-box">
              <span>View All</span>
              <span className="material-symbols-rounded  icon" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
          <div className="divider card-divider" style={{marginBlockStart: '10px', marginBlockEnd: '35px'}} />
          <TicketsCarousel
            deviceType={isSmall ? 'mobile' : "desktop"}
            elements=
              {
                tickets.length !== 0 ? (
                  tickets.map(ticket => {
                    return <TicketCard ticketName={ticket.name} ticketState={ticket.state} ticketType={ticket.type} price={ticket.price} />
                  })
                ) : (
                  [<p>No Tickets Available</p>]
                )
                
              }
              resp={{mobile: {items: 3}}}
          />
        </Stack>
      );
}
