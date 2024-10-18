import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { createEventId } from './event-utils';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/services/api/general.service';
import { UtilService } from 'src/app/core/services/util.service';
import { configReserva } from '../components/reserva/reserva.config';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  encabezado = {
    title: 'Calendario Reservas y Recepciones',
    subtitle: 'Agenda con información general de Reservas y/o Recepciones por dia'
  }

  calendarOptions: CalendarOptions = {
    height: 650,
    locales: [ esLocale ],
    locale: 'es',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'today prev next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    buttonText: {
      today:    'Hoy',
      month:    'Mes',
      week:     'Semana',
      day:      'Dia',
      list:     'Lista'
    },
    navLinks: true,
    // navLinkDayClick: function(date, jsEvent:any) {
    //   console.log('day', date.toISOString());
    //   console.log('coords', jsEvent.pageX, jsEvent.pageY);
    //   this.changeView('timeGrid');
    // },
    initialView: 'dayGridMonth',
    // initialView: 'timeGridWeek',
    nowIndicator: true,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };

  currentEvents: EventApi[] = [];

  listadoTipoHabitacion:any;
  listadoHabitacion:any;
  listadoCliente:any;
  listadoReserva:any;
  listadoRecepcion:any;
  listadoEstados = JSON.parse(JSON.stringify(configReserva)).estados;

  constructor(private changeDetector: ChangeDetectorRef, private router: Router,  
    private route: ActivatedRoute, private generalService: GeneralService,
    private utilService: UtilService) {
  }
  async ngOnInit(): Promise<void> {
    await this.cargarSelects();
    // const { calendarOptions } = this;
    // calendarOptions.events = [ {
    //   title  : 'event3',
    //   start  : '2023-12-12T12:30:00',
    //   allDay : false, // will make the time show
    //   backgroundColor: 'red',
    // }, {
    //   title  : 'even2',
    //   start  : '2023-12-12T12:30:00',
    //   allDay : true, // will make the time show
    //   backgroundColor: 'yellow'
    // }, {
    //   title  : 'event1',
    //   start  : '2023-12-12T16:30:00',
    //   allDay : false, // will make the time show
    //   backgroundColor: 'green'
    // }];
    this.mapearReservas();
    this.mapearRecepcion();
    await this.cargarEventos();
  }

  async cargarEventos(){
    console.log("Reservas:", this.listadoReserva);
    const { calendarOptions } = this;
    let eventos = [];
    for(let x of this.listadoReserva){
      eventos.push({
        title  : "Cliente: ["+x.cliente.tipoDocumento+x.cliente.numeroDocumento+" "+x.cliente.nombres+" "+x.cliente.apellidos+"-], Habitación: ["+x.habitacion.nombre+"]",
        extendedProps: {
          description: "Tipo habitacion: "+x.habitacion.tipoHabitacion.nombre+", Valor: "+x.valor+", Personas: "+x.numeroPersonas,
          type: 'Reserva',
        },
        start  : x.fechaInicio,
        end: x.fechaFin,
        allDay : false, // will make the time show
        backgroundColor: 'orange'
      });
    }
    console.log("Recepciones:", this.listadoRecepcion);
    for(let x of this.listadoRecepcion){
      eventos.push({
        title  : "Cliente: ["+x.cliente.tipoDocumento+x.cliente.numeroDocumento+" "+x.cliente.nombres+" "+x.cliente.apellidos+"-], Habitación: ["+x.habitacion.nombre+"]",
        extendedProps: {
          description: x.reserva.id=='0'?'Reserva: [No], ':'Reserva: [Si], '+"Tipo habitacion: "+x.habitacion.tipoHabitacion.nombre+", Valor: "+x.valor+", Personas: "+x.numeroPersonas,
          type: 'Recepcion',
        },
        start  : x.fechaInicio,
        end: x.fechaFin,
        allDay : false, // will make the time show
        backgroundColor: 'green'
      });
    }
    calendarOptions.events = eventos;
  }

  async cargarSelects(){
    await this.cargarListadoDesdeApi('tipo-habitacion');
    await this.cargarListadoDesdeApi('habitacion');
    await this.cargarListadoDesdeApi('cliente');
    await this.cargarListadoDesdeApi('reserva');
    await this.cargarListadoDesdeApi('recepcion');
  }

  public async cargarClientes(){
    await this.cargarListadoDesdeApi('cliente');
  }


  async cargarListadoDesdeApi(tabla:string){
    if(tabla=='tipo-habitacion'){
      this.listadoTipoHabitacion = await this.generalService.getAllApi('tipo-habitacion');
    }
    if(tabla=='habitacion'){
      this.listadoHabitacion = await this.generalService.getAllApi('habitacion');
    }
    if(tabla=='cliente'){
      this.listadoCliente = await this.generalService.getAllApi('cliente');
    }
    if(tabla=='reserva'){
      this.listadoReserva = await this.generalService.getAllApi('reserva');
    }
    if(tabla=='recepcion'){
      this.listadoRecepcion = await this.generalService.getAllApi('recepcion');
    }
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    Swal.fire({
      title: 'Crear nueva Reserva?',
      text: "Será redireccionado al formulario de Reserva o Recepción, confirme por favor!",
      icon: 'warning',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      denyButtonColor: '#26c6da',
      confirmButtonText: 'Si, Crear Reserva!',
      cancelButtonText: 'Cancelar!',
      denyButtonText: 'Si, Crear Recepción!',
    }).then((result) => {
      console.log("CALENDARIO: ", selectInfo);
      if (result.isConfirmed) {
        this.router.navigate(['/admin','reserva', 'form', '0', selectInfo.startStr+'to'+selectInfo.endStr, selectInfo.allDay?'day':'hour']);
      } else if (result.isDenied) {
        this.router.navigate(['/admin','recepcion', 'form', '0', selectInfo.startStr+'to'+selectInfo.endStr, selectInfo.allDay?'day':'hour']);
      }
    });


    // const title = prompt('Please enter a new title for your event');
    
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }

  }

  handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
    // alert(`${clickInfo.event.title} - ${clickInfo.event.extendedProps['description']}`);
    Swal.fire({
      title: "<strong>Informacion de "+clickInfo.event.extendedProps['type']+"</strong>",
      icon: "info",
      html: `
        <strong>${clickInfo.event.title}</strong></br><hr>
        ${clickInfo.event.extendedProps['description']}
      `,
      showCloseButton: true,
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  mapearReservas() {
    let listadoAux = JSON.parse(JSON.stringify(this.listadoReserva));
    for (let x of listadoAux) {
      console.log("PRUEBA:", listadoAux, x.habitacion, this.listadoHabitacion);
      x.habitacion = this.utilService.getObjeto(x.habitacion, this.listadoHabitacion);
      let habitacion = JSON.parse(JSON.stringify(x.habitacion));
      habitacion.tipoHabitacion = this.utilService.getObjeto(x.habitacion.tipoHabitacion, this.listadoTipoHabitacion);
      x.habitacion = habitacion;
      x.estado = this.listadoEstados.filter((data: any) => {
        return data.id == x.estado
      })[0];
      x.cliente = this.utilService.getObjeto(x.cliente, this.listadoCliente);
    }
    this.listadoReserva = listadoAux;
    console.log("MAPEAR RESERVAS:", listadoAux);
  }


  mapearRecepcion() {
    let listadoAux = JSON.parse(JSON.stringify(this.listadoRecepcion));
    for (let x of listadoAux) {
      console.log("PRUEBA:", listadoAux, x.habitacion, this.listadoHabitacion);
      x.habitacion = this.utilService.getObjeto(x.habitacion, this.listadoHabitacion);
      let habitacion = JSON.parse(JSON.stringify(x.habitacion));
      habitacion.tipoHabitacion = this.utilService.getObjeto(x.habitacion.tipoHabitacion, this.listadoTipoHabitacion);
      x.habitacion = habitacion;
      x.estado = this.listadoEstados.filter((data: any) => {
        return data.id == x.estado
      })[0];
      x.cliente = this.utilService.getObjeto(x.cliente, this.listadoCliente);
    }
    this.listadoRecepcion = listadoAux;
    console.log("MAPEAR RECEPCION:", listadoAux);
  }

}
